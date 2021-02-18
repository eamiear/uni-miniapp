/* eslint-disable no-redeclare */
/**
 * const validator = [
 *   {name:"phone", type : "phone", errorMsg:"请输入正确的手机号"},
 *   {name:"verifycode", type : "same", rule: this.verifycode, errorMsg:"请输入验证码"},
 *   {name:"userName", type : "notnull", errorMsg:"请输入用户名"},
 *   {name:"gender", type : "in", rule:"0,1",  errorMsg:"请选择性别"},
 *   {name:"password", type : "string", rule:"6,6",  errorMsg:"密码最小6位"},
 *   {name:"repwd", type : "same", rule: this.password,  errorMsg:"确认密码不正确"}
 * ]
 * // formData = { phone: '', userName: '' }
 * const isValid = Checker.check(formData, validator)
 */
const checks = {
	error: '',
	check (data, rule) {
		for (let i = 0; i < rule.length; i++) {
			if (!rule[i].type) { return true }
			if (!rule[i].name) { return true }
			if (!rule[i].errorMsg) { return true }
			if (!data[rule[i].name]) { this.error = rule[i].errorMsg; return false }
			switch (rule[i].type) {
				case 'string':
					var reg = new RegExp('^.{' + rule[i].rule + '}$')
          if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
          break
				case 'int':
					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].rule + '}$')
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
					break
				case 'between':
					if (!this.isNumber(data[rule[i].name])) {
						this.error = rule[i].errorMsg
						return false
					}
					var minMax = rule[i].rule.split(',')
					minMax[0] = Number(minMax[0])
					minMax[1] = Number(minMax[1])
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg
						return false
					}
				break
				case 'betweenD':
					var reg = /^-?[1-9][0-9]?$/
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
					var minMax = rule[i].rule.split(',')
					minMax[0] = Number(minMax[0])
					minMax[1] = Number(minMax[1])
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg
						return false
					}
				break
				case 'betweenF':
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
					var minMax = rule[i].rule.split(',')
					minMax[0] = Number(minMax[0])
					minMax[1] = Number(minMax[1])
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg
						return false
					}
				break
				case 'same':
					if (data[rule[i].name] !== rule[i].rule) { this.error = rule[i].errorMsg; return false }
				break
				case 'notsame':
					if (data[rule[i].name] === rule[i].rule) { this.error = rule[i].errorMsg; return false }
				break
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
				break
				case 'phone':
					var reg = /^1[0-9]{10,10}$/
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
				break
				case 'zipcode':
					var reg = /^[0-9]{6}$/
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
				break
				case 'reg':
					var reg = new RegExp(rule[i].rule)
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false }
				break
				case 'in':
					if (rule[i].rule.indexOf(data[rule[i].name]) === -1) {
						this.error = rule[i].errorMsg; return false
					}
				break
				case 'notnull':
					if (data[rule[i].name] == null || data[rule[i].name].length < 1) { this.error = rule[i].errorMsg; return false }
				break
			}
		}
		return true
	},
	isNumber (checkVal) {
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/
		return reg.test(checkVal)
	}
}
export default checks
