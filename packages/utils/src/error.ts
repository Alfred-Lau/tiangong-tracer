const ERROR_TIMEOUT = 'timeout'

export const ERROR_MAP = {
    [ERROR_TIMEOUT]: 'ERROR_TIMEOUT'
}

console.log('ERROR_MAP',ERROR_MAP)

/**
 * 通用错误信息提示函数
 * @param type 错误类型
 * @param msg 自定义信息
 */
export function error(type: string, msg: string) {
    const error_type =ERROR_MAP[type]
    // console.error(error_type, msg)
}
