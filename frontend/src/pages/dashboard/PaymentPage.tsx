// DashboardPage.tsx
import React from "react";
import { useMyPaymentsQuery } from "../../features/payment/paymentApi";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";
import { IPayment } from "../../interfaces/payment.interface";

const PaymentPage = () => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data } = useMyPaymentsQuery(user._id);
  const payments: IPayment[] = data?.data;

  return (
    <div className="mx-auto bg-white p-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Payment History</h3>
        {payments?.map((payment: IPayment) => (
          <div key={payment._id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p>
              <span className="font-bold">Plan:</span> {payment?.package?.plan}
            </p>
            <p>
              <span className="font-bold">Price:</span> $
              {payment?.package?.price}/month
            </p>
            <p>
              <span className="font-bold">Features:</span>{" "}
              {payment?.package?.features?.join(", ")}
            </p>
            <p>
              <span className="font-bold">Date:</span> {payment?.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;