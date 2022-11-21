/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

/**
 * ---重置表单函数---
 * @param {Object} base
 * @param {string} formName
 */
//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 
export function resetForm(base, formName) {
    base[formName] = base.$options.data()[formName] // 将初始状态的data复制到当前状态的data，实现重置效果
    base.$refs[formName].clearValidate() // 重置校验表单
}



/**
 *---防抖函数---
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export function debounce(fn, delay) {

    // 定时器，用来 setTimeout
    var timer

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function() {

        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this
        var args = arguments

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer)

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

/**
 *---IP输入框前置处理函数---
 * @param {Object} data   需要处理的对象
 * @return {Object}       返回一个处理后的对象
 */
export function ipInputBeforeHandle(data) {
    // 动态添加IP输入框中的标点'.'
    this.$nextTick(() => {
            for (let i = 1; i <= 3; i++) {
                document
                    .querySelector('.form-iscsi-ip')
                    .childNodes[1].insertBefore(
                        document.createTextNode('.'),
                        document.querySelector('.form-iscsi-ip').childNodes[1].children[i]
                    )
            }
        })
        // 处理传入的数据并返回
    if (data) {
        data.ip = data.ip.split('.')
        return data
    }
}

/**
 *---IP输入框后置处理函数---
 * @param {Object} data   需要处理的对象
 * @return {Object}       返回一个处理后的对象
 */
export function ipInputAfterHandle(data) {
    // 动态删除IP输入框中的标点'.'
    document
        .getElementsByClassName('el-form-item__content')
        .forEach((value) => {
            value.childNodes.forEach((item) => {
                if (item.data == '.') {
                    value.removeChild(item)
                }
            })
        })
        // 处理传入的数据并返回
    if (data) {
        data.ip = data.ip.join('.')
        return data
    }
}