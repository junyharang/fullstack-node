import express, {Router} from 'express';
import {
    addTask,
    getTask,
    updatedTask,
    deletedTask,
    getUserTaskList,
    getTotalTaskList
} from "../controller/taskController";

const router: Router = express.Router();

router.get('/tasks/', getTotalTaskList);

/**
 * @openapi
 * /task/{userId}:
 *   get:
 *     summary: 사용자 할 일 목록 조회
 *     description: user ID를 통해 할 일 조회 합니다.
 *     tags:
 *       - getTaskList
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/tasks/:userId', getUserTaskList);

/**
 * @openapi
 * /task/{taskId}:
 *   get:
 *     summary: 할 일 상세 조회
 *     description: user ID를 통해 할 일 조회 합니다.
 *     tags:
 *       - getTask
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/tasks/:taskId', getTask);

/**
 * @openapi
 * /task:
 *   post:
 *     summary: 할 일 입력
 *     description: 할 일을 입력합니다.
 *     tags:
 *       - taskList
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               isCompleted:
 *                 type: boolean
 *               isImportant:
 *                 type: boolean
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */
router.post('/tasks/', addTask);

/**
 * @openapi
 * /task/{index}:
 *   patch:
 *     summary: 할 일 수정
 *     description: 할 일 ID로 수정합니다.
 *     tags:
 *       - updatedTask
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *               isImportant:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */
router.patch('/tasks/:index', updatedTask);


/**
 * @openapi
 * /task/{index}:
 *   delete:
 *     summary: 할 일 삭제
 *     description: 할 일 ID로 삭제합니다.
 *     tags:
 *       - taskList
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */
router.delete('/task/:index', deletedTask);

export default router;
