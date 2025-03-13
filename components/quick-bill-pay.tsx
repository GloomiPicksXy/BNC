"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentModal } from "./payment-modal"

const initialBills = [
  { id: 1, name: "Renz | Business Partner", amount: 35000, dueDate: "2025-03-20" },
  { id: 2, name: "Kelly | Reseller", amount: 7000, dueDate: "2025-03-15" },
  { id: 3, name: "TNP Subscription", amount: 300, dueDate: "2025-03-20" },
  { id: 4, name: "Kyle | Checker", amount: 500, dueDate: "2025-03-30" },
]

export function QuickBillPay() {
  const [bills, setBills] = useState(initialBills)
  const [selectedBill, setSelectedBill] = useState(null)

  const handlePaymentSuccess = (paidBillId) => {
    setBills(bills.filter((bill) => bill.id !== paidBillId))
    setSelectedBill(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Payroll</CardTitle>
      </CardHeader>
      <CardContent>
        {bills.length > 0 ? (
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{bill.name}</p>
                  <p className="text-sm text-muted-foreground">Due Date: {bill.dueDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">₱{bill.amount.toLocaleString()}</span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBill(bill)}>
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">All bills have been paid</p>
        )}
      </CardContent>
      {selectedBill && (
        <PaymentModal
          bill={selectedBill}
          isOpen={!!selectedBill}
          onClose={() => setSelectedBill(null)}
          onPaymentSuccess={() => handlePaymentSuccess(selectedBill.id)}
        />
      )}
    </Card>
  )
}
