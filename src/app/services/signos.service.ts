import { Injectable } from '@angular/core';
import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  private curSubscription: Subscription | undefined;
  connection = {
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

  subscription = {
    topic: 'topic/emqx',
    qos: 0,
  };

  receiveNews = 'No news received yet.';

  client: MqttService | undefined;
  isConnection = false;
  subscribeSuccess = false;

  constructor(private _mqttService: MqttService) {
    this.client = this._mqttService;
    //this.createConnection();
  }

  createConnection(topic: string, qos: number) {
    try {
      this.client?.connect(this.connection as IMqttServiceOptions);
    } catch (error) {
      console.log('mqtt.connect error', error);
    }
    this.client?.onConnect.subscribe(() => {
      this.isConnection = true;
      console.log('Connection succeeded!');
      this.doSubscribe(topic, qos);
    });
    this.client?.onError.subscribe((error: any) => {
      this.isConnection = false;
      console.log('Connection failed', error);
    });
    this.client?.onMessage.subscribe((packet: any) => {
      const messageString = packet.payload.toString();
      const parts = messageString.split('"');
      if (parts.length >= 3) {
        this.receiveNews = parts[3];
      } else {
        console.log('Received message format is not as expected.');
      }
      console.log(
        `Received message ${packet.payload.toString()} from topic ${packet.topic}`
      );
    });
  }

  doSubscribe(topic: string, qos: number) {
    //const { topic, qos } = this.subscription;
    this.curSubscription = this.client
      ?.observe(topic, { qos } as IClientSubscribeOptions)
      .subscribe((message: IMqttMessage) => {
        this.subscribeSuccess = true;
      });
  }

  doUnSubscribe() {
    this.curSubscription?.unsubscribe();
    this.subscribeSuccess = false;
  }

  destroyConnection() {
    try {
      this.client?.disconnect(true);
      this.isConnection = false;
      console.log('Successfully disconnected!');
    } catch (error: any) {
      console.log('Disconnect failed', error.toString());
    }
  }

  
}
