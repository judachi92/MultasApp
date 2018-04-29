import {Component, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HTTP} from '@ionic-native/http';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    dataurl: any = [];
    data: any = [];
    header: any = {};

    constructor(public navCtrl: NavController, public http: HTTP, public zone: NgZone) {
    }

    ionViewDidEnter(){
        this.header['Cache-Control'] = 'no-cache';
        this.http.clearCookies();
        this.http.get('http://172.20.10.6/',{},this.header)
            .then(res =>{
                this.zone.run(()=>{
                   this.dataurl=JSON.parse(res.data);
                   this.data = this.dataurl;
                });
            }).catch(e =>{
                console.log(e);
        });
    }

    getItems(ev) {
        // Reset items back to all of the items
        this.data = this.dataurl;

        // set val to the value of the ev target
        var val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.data = this.data.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    viewData(){

    }
}
