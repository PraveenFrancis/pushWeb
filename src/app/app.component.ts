import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

 

@Component({

  selector: 'app-root',

  template: `

    <button (click)="subscribeToPushNotifications()">Subscribe to Push Notifications</button>
    <button (click)="unsubscribeFromPush()">unSubscribe to Push Notifications</button>


  `,

})

export class AppComponent {

  constructor(private http: HttpClient) {

 

    // this.unsubscribeFromPush()

  }

  async subscribeToPushNotifications() {

    try {

      const registration = await navigator.serviceWorker.register('/ngsw-worker.js');

      const subscription = await registration.pushManager.subscribe({

        userVisibleOnly: true,

        applicationServerKey: 'BGQKlHQUPtpdKdeTOFqaVC2cUX9MvxJo0ZYNPFEY_TX1wKoPpIZK6BqCXEWyUd4XjYxfpnK5aL9CG25yFtJjJx8',

      });

      // Send subscription data to your Node.js server

      await this.sendSubscriptionToServer(subscription);

    } catch (error) {

      console.error('Failed to subscribe to push notifications:', error);

    }

  }

 

  async sendSubscriptionToServer(subscription: any) {

    console.log(subscription, 'subscription');

    const url = 'http://localhost:3000/subscribe'

    this.http.post(url, subscription).subscribe((data) => {

      console.log(data)

    })

    // Send the subscription data to your Node.js server using an HTTP request.

    // You can use Angular's HttpClient to make the request.

  }

 

  async  unsubscribeFromPush() {

    try {

      const registration = await navigator.serviceWorker.getRegistration();

      if (registration) {

        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {

          await subscription.unsubscribe();

          console.log('Unsubscribed successfully');

        } else {

          console.log('No existing subscription to unsubscribe from.');

        }

      }

    } catch (error) {

      console.error('Failed to unsubscribe:', error);

    }

  }

 

}