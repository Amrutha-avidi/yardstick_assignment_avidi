import moment from "moment"; 

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Trash2, Edit } from "lucide-react";

const TransactionsTable = ({ transactions, onEdit, onDelete }) => {
    const formatDate = (date) => {
        const dateReq = moment(date).format("MMM-YYYY"); // Format like Feb-2025, Mar-2025
        return dateReq

    }
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Transactions</h2>
            {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="pl-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell>{formatDate(transaction.date)}</TableCell>
                                <TableCell>₹{transaction.amount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        onClick={() => onEdit(transaction)}
                                    >
                                        <Edit className="w-5 h-5 text-blue-500" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => onDelete(transaction._id)}
                                    >
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default TransactionsTable;
