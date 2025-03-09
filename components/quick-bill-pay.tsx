"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentModal } from "./payment-modal"

const initialEmployees = [
  { id: 1, name: "Renz | Business Partner", salary: 30000, payDate: "2025-03-15" },
  { id: 2, name: "Liza Mendoza | Project Manager", salary: 15000, payDate: "2025-03-18" },
  { id: 3, name: "Mark Villanueva | Software Engineer", salary: 15000, payDate: "2025-03-25" },
  { id: 4, name: "Angela Cruz | Marketing Specialist", salary: 15000, payDate: "2025-03-30" },
]

export function EmployeePayroll() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handlePaymentSuccess = (paidEmployeeId) => {
    setEmployees(employees.filter((employee) => employee.id !== paidEmployeeId))
    setSelectedEmployee(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Payroll</CardTitle>
      </CardHeader>
      <CardContent>
        {employees.length > 0 ? (
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">Pay Date: {employee.payDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">₱{employee.salary.toLocaleString()}</span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(employee)}>
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">All employees have been paid</p>
        )}
      </CardContent>
      {selectedEmployee && (
        <PaymentModal
          bill={selectedEmployee}
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onPaymentSuccess={() => handlePaymentSuccess(selectedEmployee.id)}
        />
      )}
    </Card>
  )
}
