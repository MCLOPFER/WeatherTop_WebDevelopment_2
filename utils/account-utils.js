
export function validateEmail(email) {
  if (email.indexOf('@') > -1) {
    const emailArray = email.split('@');
    if( emailArray.length == 2 ){
      return true;
    }
  }
  return false;
}
