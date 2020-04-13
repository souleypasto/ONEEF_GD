import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';




@Injectable({
    providedIn: 'root'
})
export class CameraService {

    imgResultBeforeCompress: string;
    imgResultAfterCompress: string;


    constructor(private camera: Camera, private imageCompress: NgxImageCompressService) {}

    getPictureFromCamera() {
        return this.getImage(this.camera.PictureSourceType.CAMERA, true);
    }

    getPictureFromPhotoLibrary() {
        return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
     }

    getImage(
        pictureSourceType,
        crop = false,
        quality = 20,
        allowEdit = false,
        saveToAlbum = false
    ) {
        const options: CameraOptions = {
            quality,
            allowEdit,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: pictureSourceType,
            encodingType: this.camera.EncodingType.PNG,
            correctOrientation: false,
            saveToPhotoAlbum: saveToAlbum
        };

        return new Promise((resolve, reject) => {
            this.camera.getPicture(options).then(
                imageData => {
                    const orientation = 0;
                    this.imgResultBeforeCompress = 'data:image/png;base64,' + imageData;
                    const poidsImage = this.imageCompress.byteCount(this.imgResultBeforeCompress) / (1024 * 1024); // le poids est en MB
                    if (poidsImage > 4) {
                        this.imageCompress.compressFile(this.imgResultBeforeCompress, orientation, 30, 20).then(
                            result => {
                                this.imgResultAfterCompress = result;
                                resolve(this.imgResultAfterCompress);
                            }, error => {
                                reject(error);
                            }
                        );
                    } else {
                        resolve(this.imgResultBeforeCompress);
                    }
                },
                async error => {
                    reject(error);

                }
            );
        });

    }





}
