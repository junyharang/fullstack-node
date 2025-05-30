import {Pool, PoolClient, QueryResult} from 'pg';
import * as process from "node:process";
import dotenv from 'dotenv';
import * as path from "node:path";

dotenv.config({
    path: path.resolve(__dirname, '../../../.env') // 📌 src/.env를 명시
});

/**
 * PostgreSQL 연결 풀 생성
 */
export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

/**
 * 쿼리 실행 함수 (search_path 설정 포함)
 * @param sqlQuery SQL 쿼리문
 * @param params 파라미터 배열
 * @returns Promise<쿼리 결과>
 */
export const query = async (
    sqlQuery: string,
    params?: any[]
): Promise<QueryResult<any>> => {
    console.log("📦 ENV 설정:", {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        db: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    });

    const client: PoolClient = await pool.connect();

    try {
        // 이 커넥션에서 search_path를 먼저 설정
        await client.query('SET search_path TO codelab_second_study');

        // 그 후 같은 커넥션에서 쿼리 실행
        return client.query(sqlQuery, params);
    } catch (error: any) {
        console.error('❌ DB 연결 실패했어요!:', error.message);

        throw error;
    } finally {
        client.release(); // 사용 후 연결 반환
    }
};
