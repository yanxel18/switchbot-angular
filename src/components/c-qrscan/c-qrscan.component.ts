import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CQrscanService } from './c-qrscan.service';
import { Subscription } from 'rxjs/internal/Subscription';
import * as Models from '../../interface/Models';
import { Router } from '@angular/router';
import * as Actions from '../../store/actions';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-c-qrscan',
  templateUrl: './c-qrscan.component.html',
  styleUrls: ['./c-qrscan.component.sass'],
  providers: [CQrscanService]
})

export class CQrscanComponent implements AfterViewInit, OnDestroy {
  scannedQRData: string[] = [];
  processBtn: boolean = false;
  querySubscription: Subscription[] = [];
  MAX_SCAN = 2;
  MAX_QRCODE_LENGTH = 1;
  @ViewChild('qrscan') scanTxt!: ElementRef;
  constructor(
    private router: Router,
    private cqrscanservice: CQrscanService,
    private store: Store<Models.SwitchbotState>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.removeItems();
  }
  ngAfterViewInit(): void {
    this.scanTxt.nativeElement.focus();
  }
  qrform = new FormGroup({
    qrscantxt: new FormControl('')
  })
  resetScan(): void {
    this.scannedQRData = [];
    this.processBtn = false;
    this.qrform.get("qrscantxt")!.setValue("");
    this.unsubscribeF();
  }
  async onScan(event: Event): Promise<void> {
    const getScanValue: string = (event.target as HTMLInputElement).value;
    if (getScanValue) this.scanSound();
    if (getScanValue.length >= this.MAX_QRCODE_LENGTH) {
      if (this.scannedQRData.length == 2) this.resetScan();
      if (this.scannedQRData.length < this.MAX_SCAN && getScanValue) {

        this.scannedQRData.push(getScanValue);
        if (this.scannedQRData[1]) {
          this.processBtn = true;
          await this.proceed();
        }
        this.qrform.get("qrscantxt")!.setValue("");
      } else this.resetScan();
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 5000
      });
      Toast.fire({
        icon: 'error',
        text: "QRコードが処理ができませんでした！"
      });
    }

  }
  scanSound(): void {
    const audio = new Audio();
    audio.src = "../../assets/sound/scan.mp3";
    audio.load();
    audio.play();
  }
  onEnter(): void {
    if (this.scannedQRData[1]) this.proceed();
  }
  async proceed(): Promise<void> {
    if (this.scannedQRData.length === this.MAX_SCAN) {
      this.unsubscribeF();
      this.querySubscription.push(this.cqrscanservice.checkQRdata(this.scannedQRData)
        .subscribe(({ data }) => {
          const userInfo = data?.WorkerToken.ScanInfo?.UInfo;
          if (data?.WorkerToken && userInfo) {
            this.setItems(data);
            this.store.dispatch(Actions.LoadWorkerInfo({ payload: userInfo }))
            this.store.dispatch(Actions.SetScan({ payload: true }));
            this.router.navigate(['control']);
          } else this.removeItems();
        })
      );

    }
  }
  private setItems(data: Models.WorkerToken): void {
    if (data.WorkerToken.Noket) localStorage.setItem("UserNoket", data.WorkerToken.Noket);
    if (data.WorkerToken.ScanInfo) {
      localStorage.setItem("Machine", data.WorkerToken.ScanInfo.machineName);
      localStorage.setItem("WName", data.WorkerToken.ScanInfo.UInfo[0].FullName);
      localStorage.setItem("GID", data.WorkerToken.ScanInfo.UInfo[0].GIDFull);
    }


  }

  private removeItems(): void {
    this.store.dispatch(Actions.LoadWorkerInfo({ payload: [] }))
    localStorage.removeItem("UserNoket");
    localStorage.removeItem("WName");
    localStorage.removeItem("GID");
    localStorage.removeItem("Machine");
  }
  unsubscribeF(): void {
    this.querySubscription.forEach(x => x.unsubscribe());
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }

}
