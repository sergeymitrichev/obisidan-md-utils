module.exports = {
  getZettelkastenId(date) {
    const year = date.getFullYear();
    const month = addLeadZero(date.getMonth() + 1);
    const day =  addLeadZero(date.getDate());
    const hours =  addLeadZero(date.getHours());
    const minutes = addLeadZero(date.getMinutes());
    return `${year}${month}${day}${hours}${minutes}`;
  }
}

const addLeadZero = (number) => (number < 10 ? '0' : '') + number;
