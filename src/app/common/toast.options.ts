import {ToastOptions} from 'ng2-toastr';

export class CustomOptions extends ToastOptions {
    animate = 'fade';
    showCloseButton = true;
}