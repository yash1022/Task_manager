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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getNotes = exports.saveNotes = exports.getTasks = exports.createTask = exports.insert_user = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insert_user = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data) {
        console.log("DATA IS NOT PROVIDED");
        return; // return if data is not provided. This helps in preventing unnecessary database operations.
    }
    try {
        const existinguser = yield prisma.user.findUnique({
            where: {
                email: String(data.email)
            },
        });
        if (existinguser) {
            return;
        }
        yield prisma.user.create({
            data: {
                name: data.displayName,
                email: data.email,
                profile_pic: data.photoURL
            }
        });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.insert_user = insert_user;
const createTask = (tasks, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findExis = yield prisma.tasks.findUnique({
            where: {
                title: tasks.content
            }
        });
        if (findExis) {
            return { success: false, message: 'Task already exists' };
        }
        const userData = yield prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        if (!userData)
            return { success: false, message: 'USER NOT FOUND' };
        yield prisma.tasks.create({
            data: {
                title: tasks.content,
                priority: tasks.priority,
                start_date: tasks.startDate,
                end_date: tasks.endDate,
                status: tasks.completed,
                userId: userData.id
            }
        });
        return { success: true, message: 'Task created successfully' };
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createTask = createTask;
const getTasks = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!userData) {
            return { success: false, message: 'User not found' };
        }
        const tasks = yield prisma.tasks.findMany({
            where: {
                userId: userData.id
            }
        });
        return tasks;
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getTasks = getTasks;
const saveNotes = (title, notes, emailId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield prisma.user.findUnique({
            where: {
                email: emailId
            }
        });
        if (!userData) {
            return { success: false, message: 'USER NOT FOUND' };
        }
        yield prisma.notes.create({
            data: {
                title: title,
                content: notes,
                userId: userData.id
            }
        });
        return { success: true, message: "NOTE SAVED SUCCESSFULLY" };
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.saveNotes = saveNotes;
const getNotes = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return { success: false, message: 'USER NOT FOUND' };
        }
        const notes = yield prisma.notes.findMany({
            where: {
                userId: user.id
            }
        });
        if (!notes) {
            return { success: false, message: 'NO NOTES FOUND' };
        }
        return { success: true, notes };
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getNotes = getNotes;
const deleteNote = (email, noteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!userdata) {
            return { success: false };
        }
        yield prisma.notes.delete({
            where: {
                id: noteId,
                userId: userdata.id
            }
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.deleteNote = deleteNote;
