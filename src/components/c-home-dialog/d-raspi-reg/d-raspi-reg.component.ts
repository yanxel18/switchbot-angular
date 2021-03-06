import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Models from '../../../interface/Models';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpecialCharValidator, UrlValidator } from '../../../validator/formvalidator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../s-dialog-service/dialog.service';
import { DRaspiRegisterMsg } from 'src/utility/messages';
@Component({
  selector: 'app-d-raspi-reg',
  templateUrl: './d-raspi-reg.component.html',
  styleUrls: ['./d-raspi-reg.component.sass'],
  providers: [DialogService]
})
export class DRaspiRegComponent implements OnDestroy {
  appSubscription: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<DRaspiRegComponent>,
    private dialogService: DialogService
  ) { }
  raspiRegForm = new FormGroup({
    raspiName: new FormControl('', [Validators.required, SpecialCharValidator()]),
    raspiServer: new FormControl('', [Validators.required, UrlValidator()]),
  });


  closeDialog(): void {
    this.dialogRef.close();
  }
  submitRegRaspi(): void {
    const newValue: Models.Raspi = {
      ...this.raspiRegForm.value
    }
    if (this.raspiRegForm.valid) {
      Swal.fire({
        title: DRaspiRegisterMsg.registerRaspiTitle,
        text: DRaspiRegisterMsg.askRaspiRegister,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'いいえ',
        cancelButtonColor: '#d33',
        confirmButtonText: 'はい'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appSubscription.push(
            this.dialogService.createRaspi(newValue).subscribe(
              async ({ data }) => {
                if (data?.createRaspi === "success") {
                  await Swal.fire({
                    icon: 'success',
                    text: DRaspiRegisterMsg.raspiRegistered
                  });
                  this.closeDialog();
                } else if (data?.createRaspi === "duplicate") {
                  await Swal.fire({
                    icon: 'error',
                    text: DRaspiRegisterMsg.raspiRegistered,
                    showConfirmButton: true
                  });
                }
                else {
                  await Swal.fire({
                    icon: 'error',
                    text: DRaspiRegisterMsg.error + data?.createRaspi,
                    showConfirmButton: true
                  });
                }
              }
            )
          )
        }
      })
    }
  }
  raspiNameErr(): string | null {
    if (this.raspiRegForm.get('raspiName')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.raspiRegForm.get('raspiName')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }

  raspiServerErr(): string | null {
    if (this.raspiRegForm.get('raspiServer')!.hasError('required')) {
      return '空白は禁止！';
    } else if (this.raspiRegForm.get('raspiServer')!.hasError('isCharValid')) {
      return '特殊文字は使用できません！';
    }
    return null;
  }

  ngOnDestroy(): void {
    this.appSubscription.forEach(s => s.unsubscribe());
  }
}
