import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success("Hello world!", "Toastr fun!", {
      timeOut: 1000,
    });
  }
  showError(message, titre, duration) {
    this.toastr.error(message, titre, {
      timeOut: duration,
    });
  }
}
