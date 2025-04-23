"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import flags from "emoji-flags";

export default function PaymentSetting() {
  const [notifyPayments, setNotifyPayments] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("GB"); // Default to United Kingdom

  const paymentHistory = [
    { id: "#15267", date: "Mar 1, 2023", amount: "$19.00", status: "Success" },
    {
      id: "#153587",
      date: "Jan 26, 2023",
      amount: "$100.00",
      status: "Success",
    },
    {
      id: "#12436",
      date: "Feb 12, 2033",
      amount: "$100.00",
      status: "Success",
    },
    {
      id: "#16879",
      date: "Feb 12, 2033",
      amount: "$100.00",
      status: "Success",
    },
    {
      id: "#16378",
      date: "Feb 28, 2033",
      amount: "$100.00",
      status: "Rejected",
    },
  ];

  const filteredHistory = paymentHistory.filter((payment) => {
    if (activeTab === "all") return true;
    if (activeTab === "complete") return payment.status === "Success";
    if (activeTab === "pending") return payment.status === "Pending";
    if (activeTab === "rejected") return payment.status === "Rejected";
    return true;
  });

  const countryList = flags.data.filter((c) => !!c.emoji);

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Notify New Payments</div>
          <div className="text-sm text-gray-500">
            You will be notified when a payment has been made.
          </div>
        </div>
        <Switch
          checked={notifyPayments}
          onCheckedChange={setNotifyPayments}
          className="bg-[#016CCD]"
        />
      </div>

      <div className="space-y-4">
        <div className="font-medium">Credit Card</div>
        <div className="flex items-center border rounded-md p-3 bg-gray-50">
          <div className="flex-1">XXXX XXXX XXXX 1978</div>
          <div className="text-gray-500 uppercase font-medium">VISA</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="font-medium">Card Holder Name</div>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            className="pl-10"
            placeholder="Card holder name"
            defaultValue="Azusa Nakano"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="font-medium">Country</div>
        <div className="flex">
          <div className="w-12 flex items-center justify-center border border-r-0 rounded-l-md text-xl">
            {flags.countryCode(selectedCountry)?.emoji}
          </div>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full rounded-l-none">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countryList.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center">{country.name}</div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#016CCD] hover:bg-blue-700 text-white">
          Save
        </Button>
      </div>

      <div className="pt-8 border-t">
        <h3 className="text-lg font-medium mb-4">Payment History</h3>

        <div className="flex space-x-2 mb-6">
          {["all", "complete", "pending", "rejected"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "bg-[#016CCD] hover:bg-blue-700 text-white"
                  : ""
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4 font-medium rounded-tl-lg">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Ammount</th>
                <th className="p-4 font-medium rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index === filteredHistory.length - 1 ? "" : "border-b"
                  }`}
                >
                  <td className="p-4 text-gray-600">{payment.id}</td>
                  <td className="p-4 text-gray-600">{payment.date}</td>
                  <td className="p-4 text-gray-600">{payment.amount}</td>
                  <td
                    className={`p-4 ${
                      payment.status === "Success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
