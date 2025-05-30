import {Request, Response} from "express";
import {query} from "../../../common/configuration/database/databaseConfiguration";
import {QueryResult} from "pg";

export const addTask = async (request: Request, response: Response): Promise<void> => {
    const {uuid, title, description, date, isCompleted, isImportant, userId} = request.body;

    try {
        const taskResult: QueryResult<any> = await query(
            'INSERT INTO task (user_id, uuid, title, description, date, is_completed, is_important) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) WHERE user_id = $1',
            [userId, uuid, title, description, date, isCompleted, isImportant]
        );

        response.status(201).json({
            message: `할 일을 정상적으로 등록하였어요!`,
            taskId: taskResult.rows[0].id,
        });
    } catch (error: any) {
        response.status(500).json({
            message: `할 일 등록 중 문제 발생하였어요! ${error.message}`
        })
    }
};

export const getTask = async (request: Request, response: Response): Promise<void> => {
    try {
        const result: QueryResult<any> = await query('SELECT * FROM task WHERE user_id AND index ORDER BY created_date_time = $1, $2', [request.params.userId, request.params.index]);

        response.status(200).json(result.rows);

    } catch (error: any) {
        response.status(500).json({
            message: `할 일 상세 조회 중 문제 발생하였어요! ${error.message}`
        });
    }
};

export const getTotalTaskList = async (request: Request, response: Response): Promise<void> => {
    try {
        console.log("📥 전체 할 일 목록 조회 요청 들어옴!");

        const result: QueryResult<any> = await query('SELECT * FROM task');

        console.log("✅ 조회 성공! 데이터 개수:", result.rowCount);

        response.status(200).json(result.rows);
    } catch (error: any) {
        response.status(500).json({
            message: `할 일 목록 조회 중 문제 발생하였어요!! ${error.message}`
        })
    }
}

export const getUserTaskList = async (request: Request, response: Response): Promise<void> => {
    try {
        const result: QueryResult<any> = await query('SELECT * FROM task WHERE user_id = $1 ORDER BY created_date_time DESC', [request.params.userId]);

        response.status(200).json(result.rows);
    } catch (error: any) {
        response.status(500).json({
            message: `할 일 목록 조회 중 문제 발생하였어요!! ${error.message}`
        })
    }
}

export const updatedTask = async (request: Request, response: Response): Promise<void> => {
    const { uuid, title, description, date, isCompleted, isImportant } = request.body;

    try {
        const taskResult: QueryResult<any> = await query(
            'UPDATE task SET uuid = $1 WHERE title = $2, description = $3, date = $4, is_completed = $5, is_important = $6',[uuid, title, description, date, isCompleted, isImportant]
        );

        response.status(200).json({
            message: `할 일을 정상적으로 수정하였어요!!`,
            taskId: taskResult.rows[0].id,
        });
    } catch (error: any) {
        response.status(500).json({
            message: `할 일 수정 중 문제 발생하였어요! ${error.message}`
        })
    }
};

export const deletedTask = async (request: Request, response: Response): Promise<void> => {
    try {
        const taskResult: QueryResult<any> = await query(
            'DELETE FROM task WHERE index = $1',
        );

        response.status(200).json({
            message: `할 일을 정상적으로 삭제하였어요!!`,
            taskId: taskResult.rows[0].id,
        });
    } catch (error: any) {
        response.status(500).json({
            message: `할 일 삭제 중 문제 발생하였어요!! ${error.message}`
        });
    }
}
