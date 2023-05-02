import { environment } from "src/environments/environment.development";

export class ApiConstants {

    private static readonly API_URL = environment.apiUrl;

    // Controllers
    public static readonly ATTACHMENTS_CONTROLLER = ApiConstants.API_URL + '/Attachments';
    public static readonly AUTHENTICATION_CONTROLLER = ApiConstants.API_URL + '/Authentication';
    public static readonly CARS_CONTROLLER = ApiConstants.API_URL + '/Cars';
    public static readonly USER_CONTROLLER = ApiConstants.API_URL + '/User';
    public static readonly CONFIG_CONTROLLER = ApiConstants.API_URL + '/Config';
    public static readonly OFFERS_CONTROLLER = ApiConstants.API_URL + '/Offers';
    public static readonly RENTAL_CONTROLLER = ApiConstants.API_URL + '/Rental';
    public static readonly BILL_CONTROLLER = ApiConstants.API_URL + '/Bill';
    public static readonly KHALTI_CONTROLLER = ApiConstants.API_URL + '/KhaltiPayment';
    public static readonly PAYMENT_CONTROLLER = ApiConstants.API_URL + '/Payment';
    public static readonly DAMAGE_CONTROLLER = ApiConstants.API_URL + '/Damage';


    //Actions
    public static readonly ATTACHMENTS ='/Attachments';
    public static readonly AUTHENTICATION ='/Authentication';
    public static readonly CARS ='/Cars';
    public static readonly USER ='/User';
    public static readonly CONFIG ='/Config';
    public static readonly OFFERS ='/Offers';
    public static readonly RENTAL ='/Rental';

    // Actions
    public static readonly STAFF = '/Staff'
    public static readonly ADMIN = '/Admin'
    public static readonly CUSTOMER = '/Customer'
    public static readonly UPLOAD = '/Upload'
    public static readonly CHANGE_STATUS = '/ChangeStatus'
    public static readonly REQUEST = '/Request'
    public static readonly UPLOAD_DOCUMENT = '/UploadDocument'
    public static readonly AFTER_DISCOUNT = '/AfterDiscount'
    public static readonly CHANGE_PASSWORD = '/Change-Password'
    public static readonly RENT = '/Rent'
    public static readonly REGISTER ='/Register';

    // Count Actions
    public static readonly CARS_AVAILABLE_COUNT = '/CarsAvailableCount'
    public static readonly CARS_ON_RENT_COUNT = '/CarsOnRentCount'
    public static readonly CAR_COUNT = '/TotalCarCount'
    public static readonly STAFF_COUNT = '/GetStaffCount'
    public static readonly ALL_CUSTOMER_COUNT = '/GetAllCustomerCount'
    public static readonly REGULAR_CUSTOMER_COUNT = '/GetRegularCustomerCount'
    public static readonly DAMAGE_COUNT = '/DamageCount'
    public static readonly GET_DTO = '/GetDto'
    public static readonly MOST_RENTED_CAR = '/MostRentedCar'
    public static readonly LEAST_RENTED_CAR = '/LeastRentedCar'
}
