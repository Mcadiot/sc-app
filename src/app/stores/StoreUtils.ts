import moment from "moment";
import { NotificationManager } from "react-notifications";
import { getDateFromBackString } from "../common/utils/DateUtils";
export function displayError(e: Error): void {
  if (e.message) {
    NotificationManager.error(e.message, "Erreur", 50000);
  } else {
    NotificationManager.error(e, "Erreur", 50000);
  }
}

export function displayTokenError(): void {
  NotificationManager.error("Utilisateur non connecté ou token invalide", "Erreur", 50000);
}

export function isTokenStillValid(token: string): boolean {
  const tokenDate = getDateFromBackString(token);
  const now = moment();
  if (tokenDate && tokenDate.isBefore(now)) {
    return false;
  }
  return true;
}

export function performIfTokenValid(expirationDate: string, dispatch: any, callback: () => void) {
  if (isTokenStillValid(expirationDate)) {
    callback();
  } else {
    dispatch({ type: "EXPIRE_TOKEN" });
    NotificationManager.error("Session expirée");
  }
}
