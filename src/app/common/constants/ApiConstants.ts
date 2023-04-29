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
}