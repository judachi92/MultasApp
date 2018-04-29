import {Component, NgZone, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HTTP} from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit{

    dataurl: any = [];
    data: any = [];
    header: any = {};

    form_multa: FormGroup;

    constructor(public navCtrl: NavController, public http: HTTP, public zone: NgZone, public loadingCtr:LoadingController) {
    }

    ngOnInit(): void {

        this.form_multa = new FormGroup({
            cedula: new FormControl('', [Validators.required])
        });

    }

    onSubmit(){
        let loading = this.loadingCtr.create({
            content: 'Por favor espere...'
        });
        loading.present();
        this.header['Cache-Control'] = 'no-cache';
        this.http.clearCookies();
        let cedula = this.form_multa.get('cedula').value;
        this.http.get('http://181.118.148.8:81/MultasWeb/public/getMultas/'+cedula,
            {},this.header)
            .then(res =>{
                this.zone.run(()=>{
                   this.dataurl=JSON.parse(res.data);
                   this.data = this.dataurl;
                    loading.dismiss();
                });
            }).catch(e =>{
                console.log(e);
                loading.dismiss();
        });
    }


    getItems(ev) {
        this.data = this.dataurl;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.data = this.data.filter(item =>  {
                return (item.Placa.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

}
