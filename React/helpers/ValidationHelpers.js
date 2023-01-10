export const comparePasswords = (current,confirm) => {
  if (current === confirm) {
      return true;
  } else {
      return false;
  }
}
export function checkPassword(str)
{
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(str);
}

export function checkEmail(str)
{
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //**!use this if above not working instead of above regex */
    return regex.test(str);
}

export function checkOnlyDigits(str)
{
    let regex = /^[0-9]{10}$/;
    return regex.test(str);
}

export function checkOnlyAlphabets(str)
{
    let regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(str);
}
