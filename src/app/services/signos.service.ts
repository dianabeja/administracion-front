import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosService {
  private curSubscription: Subscription | undefined;
  private receiveNewsSubject: Subject<string> = new Subject<string>();

  private connection = {
    hostname: 'broker.emqx.io',
    port: 8083,
    path: '/mqtt',
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 4000,
    clientId: 'mqttx_597046f4',
    username: 'emqx_test',
    password: 'emqx_test',
    protocol: 'ws',
  };

  private subscription = {
    topic: '',
    qos: 0,
  };

  private client: MqttService;

  constructor(private _mqttService: MqttService) {
    this.client = this._mqttService;
  }

  public initialize(topic: string) {
    this.subscription.topic = topic;
    this.createConnection();
  }

  private createConnection() {
    try {
      this.client.connect(this.connection as IMqttServiceOptions);
    } catch (error) {
      console.log('mqtt.connect error', error);
    }
    this.client.onConnect.subscribe(() => {
      console.log('Connection succeeded!');
      this.doSubscribe();
    });
    this.client.onError.subscribe((error: any) => {
      console.log('Connection failed', error);
    });
    this.client.onMessage.subscribe((packet: any) => {
      const messageString = packet.payload.toString();
      const parts = messageString.split('"');
      if (parts.length >= 3) {
        const news = parts[3];
        this.receiveNewsSubject.next(news);
      } else {
        console.log('Received message format is not as expected.');
      }
      console.log(
        `Received message ${packet.payload.toString()} from topic ${packet.topic}`
      );
    });
  }

  private doSubscribe() {
    const { topic, qos } = this.subscription;
    this.curSubscription = this.client.observe(topic, { qos } as IClientSubscribeOptions)
      .subscribe(() => {
        // You can add handling logic here if needed
      });
  }

  public getReceiveNews(): Observable<string> {
    return this.receiveNewsSubject.asObservable();
  }

  public unsubscribe() {
    this.curSubscription?.unsubscribe();
  }

  public disconnect() {
    try {
      this.client.disconnect(true);
      console.log('Successfully disconnected!');
    } catch (error: any) {
      console.log('Disconnect failed', error.toString());
    }
  }
}
