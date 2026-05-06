export type Stack = "backend" | "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type Package =
  | "cache" | "controller" | "cron_job" | "domain" | "handler"
  | "repository" | "route" | "service"
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils";

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5zYy51NGN5czIzMDAzQGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjEwMjUsImlhdCI6MTc3ODA2MDEyNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImViMzM4NmViLTY1NjktNGVhZS05MzM1LTAwYmJiMDBmNjMyOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFkaXRoaSBzdXJlc2giLCJzdWIiOiI1NzEzMGFhNC1lNTU2LTQxMDEtODEzYS04MmRjNDFlNTgwYmUifSwiZW1haWwiOiJjaC5zYy51NGN5czIzMDAzQGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoiYWRpdGhpIHN1cmVzaCIsInJvbGxObyI6ImNoLnNjLnU0Y3lzMjMwMDMiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiI1NzEzMGFhNC1lNTU2LTQxMDEtODEzYS04MmRjNDFlNTgwYmUiLCJjbGllbnRTZWNyZXQiOiJzTXRGcHBleUpTcGZxaEVmIn0.UcuoHcVI3W96uKzFF43_4ZeGXRodGMFWtHB_ec8PF-M";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch {
  }
}
