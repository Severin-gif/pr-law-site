export const REQUEST_AUDIT_ENDPOINT = "/api/request-audit";

export type RequestAuditPayload = {
  name: string;
  contact: string;
  message: string;
  consent: true;
  hp: string;
  ts: number;
};

export type RequestAuditSuccess = {
  ok: true;
};

export type RequestAuditFailure = {
  ok: false;
  error: string;
  status: number;
};

export type RequestAuditResult = RequestAuditSuccess | RequestAuditFailure;

function asErrorMessage(errorCode: unknown, status: number) {
  if (typeof errorCode !== "string" || !errorCode.trim()) {
    return status >= 500
      ? "Сервер временно недоступен. Попробуйте позже."
      : "Не удалось отправить заявку. Проверьте данные и попробуйте снова.";
  }

  switch (errorCode) {
    case "invalid_payload":
      return "Проверьте корректность заполнения формы.";
    case "unsupported_media_type":
      return "Ошибка формата запроса. Обновите страницу и повторите попытку.";
    case "rate_limited":
      return "Слишком много попыток. Попробуйте отправить запрос немного позже.";
    case "suspicious_payload":
      return "Запрос отклонён системой безопасности. Удалите ссылки и повторите попытку.";
    case "internal_error":
      return "Сервер временно недоступен. Попробуйте позже.";
    default:
      return status >= 500
        ? "Сервер временно недоступен. Попробуйте позже."
        : `Ошибка отправки: ${errorCode}`;
  }
}

export async function requestAudit(payload: RequestAuditPayload): Promise<RequestAuditResult> {
  try {
    const response = await fetch(REQUEST_AUDIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body: unknown = await response.json().catch(() => null);
    const apiOk = typeof body === "object" && body !== null && "ok" in body && body.ok === true;

    if (response.ok && apiOk) {
      return { ok: true };
    }

    const errorCode =
      typeof body === "object" && body !== null && "error" in body ? body.error : undefined;

    return {
      ok: false,
      error: asErrorMessage(errorCode, response.status),
      status: response.status,
    };
  } catch {
    return {
      ok: false,
      error: "Ошибка сети. Проверьте подключение и повторите попытку.",
      status: 0,
    };
  }
}
