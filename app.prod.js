const app = Vue.createApp({
  data() {
    return {
      subject: '',
      amount: null,
      type: 'inc',
      totalInc: 0,
      totalExp: 0,
      totalBal: 0,
      incomeList: [],
      expenseList: [],
      errorMsg: '',
      expensePercentage: 0,
      balancePercentage: 0,
    }
  },
  computed: {
    showErrorMsg() {
      return this.errorMsg.length;
    },
    showIncomeTable() {
      return this.incomeList.length;
    },
    showExpenseTable() {
      return this.expenseList.length;
    },
    showChart() {
      return this.expensePercentage || this.balancePercentage;
    }
  },
  methods: {
    addItem() {
      if (this.subject && this.amount > 0) {
        if (this.type === 'inc') {
          this.incomeList.push({
            subject: this.subject,
            amount: this.amount
          });
          this.subject = '';
          this.amount = null;
          this.calcIncome();
          this.calcBalance();
          this.calcExpensePercentage();
          this.calcBalancePercentage();
        }
        if (this.type === 'exp') {
          this.expenseList.push({
            subject: this.subject,
            amount: this.amount
          });
          this.subject = '';
          this.amount = null;
          this.calcExpense();
          this.calcBalance();
          this.calcExpensePercentage();
          this.calcBalancePercentage();
        }
        this.errorMsg = '';
      } else {
        this.errorMsg = "Input field can't be empty or amount can't be negative / zero";
      }
    },
    calcIncome() {
      const reducer = (accumulator, currentValue) => accumulator + Number(currentValue.amount);
      this.totalInc = this.incomeList.reduce(reducer, 0);
    },
    calcExpense() {
      const reducer = (accumulator, currentValue) => accumulator + Number(currentValue.amount);
      this.totalExp = this.expenseList.reduce(reducer, 0);
    },
    calcBalance() {
      this.totalBal = this.totalInc - this.totalExp;
    },
    calcExpensePercentage() {
      if (this.totalExp && this.totalInc) {
        this.expensePercentage = ((this.totalExp / this.totalInc) * 100).toFixed(2);
      } else {
        this.expensePercentage = 0;
      }
    },
    calcBalancePercentage() {
      if (this.totalBal && this.totalInc) {
        this.balancePercentage = ((this.totalBal / this.totalInc) * 100).toFixed(2);
      } else {
        this.balancePercentage = 0;
      }
    },
    removeInc(i) {
      this.incomeList.splice(i, 1);
      this.calcIncome();
      this.calcBalance();
      this.calcExpensePercentage();
      this.calcBalancePercentage();
    },
    removeExp(i) {
      this.expenseList.splice(i, 1);
      this.calcExpense();
      this.calcBalance();
      this.calcExpensePercentage();
      this.calcBalancePercentage();
    }
  }
});

app.mount('#expense');