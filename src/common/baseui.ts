import {Loading, LoadingController, ToastController, Toast, AlertController, Alert} from 'ionic-angular';

/**
 * UI 层的所有公用方法的抽象类
 *
 * @export
 * @abstract
 * @class BaseUI
 */
export abstract class BaseUI {
    constructor() { }

    /**
     * 通用的展示 loading 的组件
     *
     * @protected
     * @param {LoadingController} loadingCtrl
     * @param {string} message
     * @returns {Loading}
     * @memberof BaseUI
     */
    protected showLoading(loadingCtrl: LoadingController,
        message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true //页面变化的时候自动关闭 loading
        });
        loader.present();
        return loader;
    }


    /**
     * 通用的展示 toast 的组件
     *
     * @protected
     * @param {ToastController} toastCtrl
     * @param {string} message
     * @param {number} middleId : 0: 提示在顶部  1：提示在中间   其他：提示在底部
     * @returns {Toast}
     * @memberof BaseUI
     */
    protected showToast(toastCtrl: ToastController, message: string, middleId: number): Toast {
        let toast = toastCtrl.create({
            message: message,
            duration: 3000, //默认展示的时长
            position: (middleId == 0 ? 'top' : (middleId == 1 ? 'middle' : 'bottom'))
        });
        toast.present();
        return toast;
    }

  protected showAlert(alertCtrl: AlertController, title: string, subTitle: string, btnMsg: string): Alert {
    let alert = alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [btnMsg]
    });
    alert.present();
    return alert;
  }

}
