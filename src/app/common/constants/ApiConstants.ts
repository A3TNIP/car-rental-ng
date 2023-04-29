import { environment } from "src/environments/environment.development";

export class ApiConstants {

    public static readonly API_URL = environment.apiUrl;

    // Controllers
    public static readonly ATTACHMENTS_CONTROLLER = ApiConstants.API_URL + '/Attachments';
    public static readonly AUTHENTICATION_CONTROLLER = ApiConstants.API_URL + '/Authentication';
    public static readonly CARS_CONTROLLER = ApiConstants.API_URL + '/Cars';
    public static readonly USER_CONTROLLER = ApiConstants.API_URL + '/User';
    public static readonly CONFIG_CONTROLLER = ApiConstants.API_URL + '/Config';
    public static readonly OFFERS_CONTROLLER = ApiConstants.API_URL + '/Offers';
    public static readonly RENTAL_CONTROLLER = ApiConstants.API_URL + '/Rental';


    // Actions
    public static readonly STAFF = '/Staff'
    public static readonly ADMIN = '/Admin'
    public static readonly CUSTOMER = '/Customer'
    public static readonly UPLOAD = '/Upload'
    public static readonly CHANGE_STATUS = '/ChangeStatus'
    public static readonly REQUEST = '/Request'
    public static readonly UPLOAD_DOCUMENT = '/UploadDocument'
    public static readonly AFTER_DISCOUNT = '/AfterDiscount'
    public static readonly ATTACHMENTS = '/Attachments'
}
