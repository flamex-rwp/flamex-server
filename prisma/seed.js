"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="node" />
// prisma/seed.ts
require("dotenv/config");
var client_1 = require("./../src/generated/prisma/client");
var adapter_pg_1 = require("@prisma/adapter-pg");
var bcryptjs_1 = require("bcryptjs");
// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}
var prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({
        connectionString: process.env.DATABASE_URL,
        accelerateUrl: "",
    }),
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var adminPassword, managerPassword, categories, menuItems, customers, today, yesterday, dineInOrder, deliveryOrder, _i, customers_1, customer, orders, totalOrders, totalSpent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("🌱 Starting database seeding...");
                    // Clear existing data (order matters due to foreign keys)
                    return [4 /*yield*/, prisma.orderEditHistory.deleteMany()];
                case 1:
                    // Clear existing data (order matters due to foreign keys)
                    _a.sent();
                    return [4 /*yield*/, prisma.orderItem.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.order.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.expense.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.menuItem.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.deleteMany()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.customer.deleteMany()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.rider.deleteMany()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.businessInfo.deleteMany()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 10:
                    _a.sent();
                    // Business info
                    console.log("📊 Creating business info...");
                    return [4 /*yield*/, prisma.businessInfo.createMany({
                        data: [
                            { key: "easypaisa_name", value: "Abdullah Saleem" },
                            { key: "easypaisa_account", value: "03307072222" },
                            { key: "business_name", value: "Flamex" },
                        ],
                    })];
                case 11:
                    _a.sent();
                    // Users
                    console.log("👥 Creating default users...");
                    return [4 /*yield*/, bcryptjs_1.default.hash("admin123", 10)];
                case 12:
                    adminPassword = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.hash("manager123", 10)];
                case 13:
                    managerPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.createMany({
                        data: [
                            {
                                username: "admin",
                                password: adminPassword,
                                fullName: "System Administrator",
                                role: "admin",
                                email: "admin@flamex.com",
                                status: "active",
                            },
                            {
                                username: "manager",
                                password: managerPassword,
                                fullName: "Store Manager",
                                role: "manager",
                                email: "manager@flamex.com",
                                status: "active",
                            },
                        ],
                        skipDuplicates: true,
                    })];
                case 14:
                    _a.sent();
                    // Categories
                    console.log("📁 Creating categories...");
                    return [4 /*yield*/, prisma.category.createMany({
                        data: [
                            { name: "Burgers", description: "Delicious burgers" },
                            { name: "Pizzas", description: "Fresh pizzas" },
                            { name: "Drinks", description: "Cold beverages" },
                            { name: "Desserts", description: "Sweet treats" },
                        ],
                        skipDuplicates: true,
                    })];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.findMany()];
                case 16:
                    categories = _a.sent();
                    // Menu items
                    console.log("🍔 Creating menu items...");
                    return [4 /*yield*/, prisma.menuItem.createMany({
                        data: [
                            {
                                name: "Classic Burger",
                                description: "Beef patty with lettuce, tomato, and special sauce",
                                price: 350,
                                categoryId: categories.find(function (c) { return c.name === "Burgers"; }).id,
                                available: true,
                            },
                            {
                                name: "Cheese Pizza",
                                description: "Classic cheese pizza with mozzarella",
                                price: 800,
                                categoryId: categories.find(function (c) { return c.name === "Pizzas"; }).id,
                                available: true,
                            },
                            {
                                name: "Coca Cola",
                                description: "330ml can",
                                price: 80,
                                categoryId: categories.find(function (c) { return c.name === "Drinks"; }).id,
                                available: true,
                            },
                            {
                                name: "Chocolate Cake",
                                description: "Rich chocolate cake slice",
                                price: 200,
                                categoryId: categories.find(function (c) { return c.name === "Desserts"; }).id,
                                available: true,
                            },
                        ],
                        skipDuplicates: true,
                    })];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, prisma.menuItem.findMany()];
                case 18:
                    menuItems = _a.sent();
                    // Customers
                    console.log("👤 Creating sample customers...");
                    return [4 /*yield*/, prisma.customer.createMany({
                        data: [
                            {
                                name: "Ali Khan",
                                phone: "03001234567",
                                address: "House 123, Street 45, Lahore",
                                totalOrders: 5,
                                totalSpent: 2500,
                            },
                            {
                                name: "Sara Ahmed",
                                phone: "03331234567",
                                address: "Flat 45, Block B, Karachi",
                                totalOrders: 3,
                                totalSpent: 1500,
                            },
                        ],
                        skipDuplicates: true,
                    })];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, prisma.customer.findMany()];
                case 20:
                    customers = _a.sent();
                    // Riders
                    console.log("🚴 Creating sample riders...");
                    return [4 /*yield*/, prisma.rider.createMany({
                        data: [
                            {
                                name: "Rider One",
                                phone: "03111234567",
                                address: "Lahore",
                                status: "active",
                                totalDeliveries: 25,
                                totalCashCollected: 12500,
                            },
                            {
                                name: "Rider Two",
                                phone: "03221234567",
                                address: "Karachi",
                                status: "active",
                                totalDeliveries: 18,
                                totalCashCollected: 9000,
                            },
                        ],
                        skipDuplicates: true,
                    })];
                case 21:
                    _a.sent();
                    // Orders
                    console.log("📦 Creating sample orders...");
                    today = new Date();
                    yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    return [4 /*yield*/, prisma.order.create({
                        data: {
                            totalAmount: 430,
                            subtotal: 430,
                            paymentMethod: "cash",
                            amountTaken: 500,
                            returnAmount: 70,
                            status: "completed",
                            orderType: "dine_in",
                            orderStatus: "completed",
                            paymentStatus: "completed",
                            tableNumber: "1",
                            orderNumber: 1001,
                            cashierName: "Cashier",
                            createdAt: yesterday,
                        },
                    })];
                case 22:
                    dineInOrder = _a.sent();
                    return [4 /*yield*/, prisma.orderItem.createMany({
                        data: [
                            {
                                orderId: dineInOrder.id,
                                menuItemId: menuItems[0].id,
                                quantity: 1,
                                price: 350,
                            },
                            {
                                orderId: dineInOrder.id,
                                menuItemId: menuItems[2].id,
                                quantity: 1,
                                price: 80,
                            },
                        ],
                    })];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, prisma.order.create({
                        data: {
                            totalAmount: 1000,
                            subtotal: 800,
                            paymentMethod: "cash",
                            amountTaken: 1000,
                            returnAmount: 0,
                            status: "completed",
                            orderType: "delivery",
                            orderStatus: "completed",
                            paymentStatus: "completed",
                            deliveryCharge: 200,
                            deliveryAddress: "House 456, Street 78, Islamabad",
                            deliveryStatus: "delivered",
                            customerId: customers[0].id,
                            orderNumber: 1002,
                            cashierName: "Cashier",
                            createdAt: today,
                            deliveredAt: today,
                        },
                    })];
                case 24:
                    deliveryOrder = _a.sent();
                    return [4 /*yield*/, prisma.orderItem.createMany({
                        data: [
                            {
                                orderId: deliveryOrder.id,
                                menuItemId: menuItems[1].id,
                                quantity: 1,
                                price: 800,
                            },
                        ],
                    })];
                case 25:
                    _a.sent();
                    console.log("💰 Creating sample expense...");
                    return [4 /*yield*/, prisma.expense.create({
                        data: {
                            description: "Vegetables purchase",
                            amount: 5000,
                            category: "Food Supplies",
                            paymentMethod: "cash",
                            quantity: 10,
                            unit: "KG",
                            unitPrice: 500,
                            expenseDate: today,
                        },
                    })];
                case 26:
                    _a.sent();
                    console.log("📈 Updating customer statistics...");
                    _i = 0, customers_1 = customers;
                    _a.label = 27;
                case 27:
                    if (!(_i < customers_1.length)) return [3 /*break*/, 31];
                    customer = customers_1[_i];
                    return [4 /*yield*/, prisma.order.findMany({
                        where: { customerId: customer.id },
                    })];
                case 28:
                    orders = _a.sent();
                    totalOrders = orders.length;
                    totalSpent = orders.reduce(function (sum, order) { return sum + Number(order.totalAmount); }, 0);
                    return [4 /*yield*/, prisma.customer.update({
                        where: { id: customer.id },
                        data: { totalOrders: totalOrders, totalSpent: totalSpent },
                    })];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30:
                    _i++;
                    return [3 /*break*/, 27];
                case 31:
                    console.log("✅ Database seeding completed successfully!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (error) {
        console.error("❌ Seeding failed:", JSON.stringify(error, null, 2));
        process.exit(1);
    })
    .finally(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
