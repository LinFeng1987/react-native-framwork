import React, {Component} from 'react'
import Toast from 'react-native-root-toast';
import {ActivityIndicator, StyleSheet, Dimensions, View, Text, AsyncStorage} from 'react-native';
import RootSiblings from 'react-native-root-siblings'

/**
 * 网络请求
 * @type {{get(*=, *=): *, post(*=, *=): *}}
 */
export const Net = {
    /**
     * get请求
     * @param url
     * @param params
     * @returns {Promise<any> | Promise}
     */
    get(url, params) {
        Common.Indicator.show();
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                Common.Indicator.hide();
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status})
                }
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject({status: -1});
            })
        })

    },
    /**
     * post请求
     * @param url
     * @param params
     * @returns {Promise<any> | Promise}
     */
    post(url, params) {
        return new Promise(function (resolve, reject) {
            Common.Indicator.show();
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: params,
            }).then((response) => {
                Common.Indicator.hide();
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status})
                }
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject({status: -1});
            })
        })
    }
}

/**
 * 全局方法
 * @type {{Toast: {show(*): void}, Indicator: {sibling: boolean, show(): undefined, hide(): void}}}
 */
export const Common = {
    /**
     * 提示文本
     */
    Toast: {
        show(content) {
            let toast = undefined;
            if (toast !== undefined) {
                Toast.hide(toast);
            }
            toast = Toast.show(content.toString(), {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });

        }
    },
    /**
     * 菊花转
     */
    Indicator: {
        sibling: false,
        show() {
            if (this.sibling !== false) return;
            const width = Dimensions.get('window').width;
            const height = Dimensions.get('window').height;
            const styles = StyleSheet.create({
                    maskStyle: {
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        width: width,
                        height: height + 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    backViewStyle: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        width: 120,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    },
                    Text: {
                        color: "white",
                        fontSize: 14,
                        marginTop: 10
                    }
                }
            )
            this.sibling = new RootSiblings(
                <View style={styles.maskStyle}>
                    <View style={styles.backViewStyle}>
                        <ActivityIndicator size="large" color="white"/>
                        <Text style={styles.Text}>努力加载中</Text>
                    </View>
                </View>
            )
        },
        hide() {
            if (this.sibling !== false) {
                this.sibling.destroy();
                this.sibling = false
            }
        }
    }

}

/**
 * 本地存储
 * @type {{saveJsonObject(*=, *=): Promise<*>, getJsonObject(*=, *=): Promise<*>, saveString(*=, *=): Promise<*>, getString(*=, *=): Promise<*>, remove(*=): Promise<*>, getAllKeys(): Promise<*>}}
 */
export const StorageUtil = {
    /**
     保存一个Json对象
     @param key
     @param value
     @param callback
     */
    async saveJsonObject(key, value) {
        return await
            this.saveString(key, JSON.stringify(value));
    },

    /**
     获取一个Json对象
     @param key
     @param defaultObject
     */
    async getJsonObject(key, defaultObject) {
        let result = null;
        try {
            result = await
                this.getString(key, null);
            result = await
                JSON.parse(result);
        } catch (err) {
            if (defaultObject) {
                return Promise.resolve(defaultObject);
            } else {
                return Promise.reject(err);
            }
        }
        return result;

    },

    /**
     保存一个值
     @param key
     @param value
     */
    async saveString(key, value) {
        if (key != null && value != null) {
            try {
                await
                    AsyncStorage.setItem(key, value)
            } catch (err) {
                return Promise.reject(err)
            }
            return Promise.resolve(true);
        } else {
            return Promise.reject({"msg": "Key and value can not be null"});
        }
    },

    /**
     获取一个值
     @param key
     @param defaultValue
     */
    async getString(key, defaultValue) {
        let result = null;
        let noDataError = {"msg": "No value found !"};
        if (key != null) {
            result = await
                AsyncStorage.getItem(key);
            return result ? result : defaultValue != null ? defaultValue : Promise.reject(noDataError);
        } else {
            if (defaultValue) {
                return Promise.resolve(defaultValue);
            } else {
                return Promise.reject(noDataError);
            }
        }

    },

    /**

     移除一个值
     @param key
     */
    async remove(key) {
        let result = true;
        try {
            result = await
                AsyncStorage.removeItem(key);
        } catch (err) {
            return Promise.reject(err)
        }
        return result;
    },

    /**

     获取所有已存储
     */
    async getAllKeys() {
        let result = true;
        try {
            result = await
                AsyncStorage.getAllKeys();
        } catch (err) {
            return Promise.reject(err)
        }
        return result;
    },
}