import axios from "axios";


import { AdvancedError } from "../classes";
import { baseURL } from "../constants";




export const commonFunctions = {
    deleteUser: async function (token, _data) {
        try {
            const res = await axios.post(`${baseURL}/admin/users/delete`, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
}



export const kycFunctions = {
    addMentorKYC: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/mentor/kyc`,
                JSON.stringify(_data), {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addStudentKYC: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/student/kyc`,
                JSON.stringify(_data), {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAStudentKYC: async function (_data, token) {
        try {
            const res = await axios.get(`${baseURL}/student/kyc`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAStudentKYCById: async function (id, token) {
        try {
            const res = await axios.get(`${baseURL}/admin/student/kyc/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAMentorKYC: async function (_data, token) {
        try {
            const res = await axios.get(`${baseURL}/mentor/kyc`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAMentorKYCById: async function (id, token) {
        try {
            const res = await axios.get(`${baseURL}/admin/mentor/kyc/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAllStudentKYC: async function (_data, token) {
        try {
            const res = await axios.get(`${baseURL}/admin/student/kyc/fetch`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAllMentorKYC: async function (_data, token) {
        try {
            const res = await axios.get(`${baseURL}/admin/mentor/kyc/fetch`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteStudentKYC: async function (_data, token, id) {
        try {
            const res = await axios.delete(`${baseURL}/student/kyc/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteMentorKYC: async function (_data, token, id) {
        try {
            const res = await axios.delete(`${baseURL}/mentor/kyc/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
}

export const affiliatesFunctions = {
    becomeAffiliate: async function (token) {

        const res = await axios.post(`${baseURL}/user/affiliate/activate`,
            {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            validateStatus: status => {
                return status >= 200 && status <= 505;
            }
        })
        return res
    },
    fetchAffiliateStats: async function (token) {

        const res = await axios.get(`${baseURL}/affiliate/stats/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        return res
    },
    fetchEarnings: async function (token) {

        const res = await axios.get(`${baseURL}/affiliate/records/fetch'`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        return res
    },
    visitAffiliate: async function (_data, token) {

        const res = await axios.post(`${baseURL}/affiliate/visit/${token}`,
            JSON.stringify(_data), {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: status => {
                return status >= 200 && status <= 505;
            }
        })
        return res
    },
}

export const authFunctions = {
    login: async function (_data, type) {
        try {
            const res = await axios.post(type !== "admin" ? `${baseURL}/user/signin` : `${baseURL}/admin/signin`,
                JSON.stringify(_data), {
                headers: {
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    register: async function (_data, type) {
        try {
            const res = await axios.post(type !== "admin" ? `${baseURL}/user/signup` : `${baseURL}/admin/signup`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    verifyEmail: async function (_data) {
        try {
            const res = await axios.post(`${baseURL}/user/email/verify`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    resendEmailOTP: async function (_data) {
        try {
            const res = await axios.post(`${baseURL}/user/email/otp/send`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    googleSignUp: async function (_data) {
        try {
            const res = await axios.post(`${baseURL}/user/google/signup`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    googleSignIn: async function (_data) {
        const res = await axios.post(`${baseURL}/user/google/signin`,
            JSON.stringify(_data),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        return res
    },
    facebookSignUp: async function (_data) {
        try {
            const res = await axios.post(`${baseURL}/user/facebook/signup`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    facebookSignIn: async function (_data) {
        const res = await axios.post(`${baseURL}/user/facebook/signin`,
            JSON.stringify(_data),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        return res
    },
    changePassword: async function (data, token) {
        const res = await axios.patch(`${baseURL}/user/profile/update`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        return res
    }

}



export const adminTeacherFunctions = {
    fetch: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/teachers/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    verify: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/teacher/verify/toggle`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    verify_pledre: async function (_data, token) {
        try {
            const res = await axios.patch(`${baseURL}/admin/teacher/pledre/toggle`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    makeMentorPage: async function (token, _data) {
        try {
            const res = await axios.post(`${baseURL}/admin/mentor/page/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addMentor: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/mentor/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateMentor: async function (id, data, token) {
        try {
            const res = await axios.put(`${baseURL}/admin/mentor/page/update/${id}`,
                JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteMentor: async function (id, token) {
        try {
            const res = await axios.delete(`${baseURL}/admin/mentor/page/delete/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },



}


export const adminStudentFunctions = {
    fetch: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/students/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    verify: async function (_data, token) {
        try {
            const res = await axios.patch(`${baseURL}/admin/student/verify`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    verify_pledre: async function (_data, token) {
        try {
            const res = await axios.patch(`${baseURL}/admin/student/pledre/toggle`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    }

}



export const adminFunctions = {
    uploadFile: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/file/upload`, _data, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: status => {
                    return status >= 200 && status < 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    message: err.message,
                    statusCode: 0,
                    success: false
                }
            }
        }
    },
    fetchEarnings: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/earnings/fetch`, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status < 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    message: err.message,
                    statusCode: 0,
                    success: false
                }
            }
        }
    },
    fetchWithdrawals: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/teacher/withdrawals/fetch`, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status < 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    message: err.message,
                    statusCode: 0,
                    success: false
                }
            }
        }
    },
    updateAvatar: async function (formdata, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/profile/avatar/update`,
                formdata,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateProfile: async function (_data, token) {
        try {
            const res = await axios.patch(`${baseURL}/admin/profile/update`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchProfile: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/profile`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addCategory: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/category/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCategory: async function (id, token) {
        try {
            const res = await axios.get(`${baseURL}/admin/category/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCategories: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/categories`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourses: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/courses/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addCourse: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/course/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteCourse: async function (token, id) {
        try {
            const res = await axios.delete(`${baseURL}/admin/course/delete/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    adminUpdateCourse: async function (token, id, _data) {

        try {
            const res = await axios.put(`${baseURL}/admin/course/update/${id}`, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    toggleCourseStatus: async function (token, id, courseId) {
        try {
            const res = await axios.patch(`${baseURL}/admin/course/status/toggle/${id}`, JSON.stringify(courseId),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteCategory: async function (token, id) {
        try {
            const res = await axios.delete(`${baseURL}/admin/category/delete/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateCategory: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/admin/category/update/${id}`, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchBootcamps: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/bootcamps/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateBootcamp: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/admin/bootcamp/update/${id}`, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    toggleBootcampStatus: async function (token, data, id) {

        try {
            const res = await axios.patch(`${baseURL}/admin/bootcamp/toggle/${id}`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteBootcamp: async function (token, id) {
        try {
            const res = await axios.delete(`${baseURL}/admin/bootcamp/delete/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addBootcamp: async function (token, _data) {
        try {
            const res = await axios.post(`${baseURL}/admin/bootcamp/add`, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchNotifications: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/notifications/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            // Error from backend
            if (res.data.message !== "Notifications fetched successfully") throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    readNotifications: async function (token) {
        try {
            const res = await axios.post(`${baseURL}/admin/notifications/action/read`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    AddLPHero: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/settings/homepage/hero/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchLPHero: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/settings/homepage/hero/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateLPHero: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/admin/settings/homepage/hero/update
            `, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    AddCohortSection: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/settings/cohort/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCohortSection: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/settings/cohort/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateCohortSection: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/admin/settings/cohort/update
            `, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    AddTPHero: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/settings/teacherpage/hero/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchTPHero: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/settings/teacherpage/hero/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateTPHero: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/admin/settings/teacherpage/hero/update
            `, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    AddSelfpacedSection: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/admin/settings/selfpaced/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchSelfpacedSection: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/settings/selfpaced/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateSelfpacedSection: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/admin/settings/selfpaced/update
            `, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchPayment: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/admin/payments/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getUnreadMessages: async function (token) {

        const res = await axios.get(`${baseURL}/user/unread/message/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        return res

    },
    getMessages: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/user/message/fetch/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        } 
    },
    sendMessage: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/user/message/send`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    readMessage: async function (token, data) {
        try {
            const res = await axios.patch(`${baseURL}/user/message/mark/read`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    messageDelivered: async function (token, data) {
        try {
            const res = await axios.patch(`${baseURL}/user/message/mark/delivered`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    deleteAUser: async function (token, data) {
        console.log({ data });
        try {
            const res = await axios.post(`${baseURL}/admin/users/delete`, JSON.stringify([data]),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addWebinar: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/admin/webinar/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getWebinar: async function (token, data) {
        try {
            const res = await axios.get(`${baseURL}/admin/webinars/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateWebinar: async function (token,id, data) {
        try {
            const res = await axios.put(`${baseURL}/admin/webinar/update/${id}`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteWebinar: async function (token, data) {
        try {
            const res = await axios.delete(`${baseURL}/admin/webinar/delete/${data}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    addBlog: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/admin/blog/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getBlog: async function (token, data) {
        try {
            const res = await axios.get(`${baseURL}/admin/blogs/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateBlog: async function (token,id, data) {
        try {
            const res = await axios.put(`${baseURL}/admin/blog/update/${id}`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteBlog: async function (token, data) {
        try {
            const res = await axios.delete(`${baseURL}/admin/blog/delete/${data}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

}


export const studentFunctions = {
    updateAvatar: async function (formdata, token) {
        try {
            const res = await axios.post(`${baseURL}/user/profile/avatar/update`,
                formdata,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateProfile: async function (_data, token) {
        try {
            const res = await axios.patch(`${baseURL}/user/profile/update`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchProfile: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/profile`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourses: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/courses/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchEnrollments: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/course/enrollments/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchFees: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/student/payments/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchStudentFees: async function (token) {
        console.log("studentpaymenttoken", token);
        try {
            const res = await axios.get(`${baseURL}/student/courses/enrollments/payment/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            console.log("result payment", res);

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchBootcampFees: async function (token) {
        console.log("studentpaymenttoken", token);
        try {
            const res = await axios.get(`${baseURL}/student/bootcamps/enrollments/payments/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            console.log("result payment", res);

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    payStudentFees: async function (token, paymentId) {
        // console.log({token});
        try {
            const res = await axios.post(`${baseURL}/student/payment/init`, {
                paymentId
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addCourse: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/user/course/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            console.error(err)
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    rateCourse: async function (token, id) {
        try {
            const res = await axios.post(`${baseURL}/user/course/rate/${id}`,
                // JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    rateTeacher: async function (token, id) {
        try {
            const res = await axios.post(`${baseURL}/user/teacher/rate/${id}`,
                // JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    wishlistCourse: async function (courseID, token) {
        try {
            const res = await axios.post(`${baseURL}/user/wishlist/add/${courseID}`, JSON.stringify({}),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addwishlistCourse: async function (courseID, token) {
        try {
            const res = await axios.post(`${baseURL}/user/wishlist/add-class/${courseID}`, JSON.stringify({}),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchWishlist: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/wishlist/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteFromWishlist: async function (token, id) {
        try {
            const res = await axios.post(`${baseURL}/user/wishlist/remove/${id}`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    clearWishlist: async function (token, id) {
        try {
            const res = await axios.delete(`${baseURL}/user/wishlist/clear`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addBootcamp: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/user/bootcamp/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            console.error(err)
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchBootcamps: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/student/bootcamps/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchNotifications: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/notifications/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            // Error from backend
            if (res.data.message !== "Notifications fetched successfully") throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    readNotifications: async function (token) {
        try {
            const res = await axios.post(`${baseURL}/user/notifications/action/read`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getWebinar: async function (data) {
        try {
            const res = await axios.get(`${baseURL}/user/webinars/fetch`
            // ,
            // {
            //         headers: {
            //             "Authorization": `Bearer ${token}`,
            //             "Content-Type": "application/json"
            //         },
            //         validateStatus: status => {
            //             return status >= 200 && status <= 505;
            //         }
            //     }
                )

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getAWebinar: async function (id) {
        try {
            const res = await axios.get(`${baseURL}/user/webinar/fetch/${id}`
            // ,
            // {
            //         headers: {
            //             "Authorization": `Bearer ${token}`,
            //             "Content-Type": "application/json"
            //         },
            //         validateStatus: status => {
            //             return status >= 200 && status <= 505;
            //         }
            //     }
                )

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getBlogs: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/blogs/fetch`
                // ,{
                //     headers: {
                //         "Authorization": `Bearer ${token}`,
                //         "Content-Type": "application/json"
                //     },
                //     validateStatus: status => {
                //         return status >= 200 && status <= 505;
                //     }
                // }
                )

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    getABlog: async function (id) {
        try {
            const res = await axios.get(`${baseURL}/user/blog/fetch/${id}`
            // ,
            //     {
            //         headers: {
            //             "Authorization": `Bearer ${token}`,
            //             "Content-Type": "application/json"
            //         },
            //         validateStatus: status => {
            //             return status >= 200 && status <= 505;
            //         }
            //     }
                )

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
}


export const teacherFunctions = {
    updateAvatar: async function (formdata, token) {

        try {
            const res = await axios.post(`${baseURL}/user/profile/avatar/update`,
                formdata,
                {
                    headers: {

                        "Authorization": `Bearer ${token}`,

                        "Content-Type": "multipart/form-data"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    withdrawalRequest: async function (_data, token) {

        try {
            const res = await axios.post(`${baseURL}/teacher/withdrawal/request`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateProfile: async function (_data, token) {
        try {
            const res = await axios.patch(`${baseURL}/user/profile/update`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchEarnings: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/earnings/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchProfile: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/profile`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addCourse: async function (_data, token) {
        try {
            const res = await axios.post(`${baseURL}/teacher/course/add`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourse: async function (_id, token) {
        try {
            const res = await axios.get(`${baseURL}/course/${_id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchApplications: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/user/course/applications/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourseStudents: async function (_id, token) {
        try {
            const res = await axios.get(`${baseURL}/user/course/students/${_id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourses: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/teacher/courses/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    updateCourse: async function (token, id, _data) {
        try {
            const res = await axios.put(`${baseURL}/teacher/course/update/${id}`, JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteCourse: async function (token, id) {
        try {
            const res = await axios.delete(`${baseURL}/teacher/course/delete/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchBootcamps: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/teacher/bootcamps/fetch`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
}


export const otherFunctions = {
    // CHANGE URL

    fetchMentors: async function () {
        try {
            const res = await axios.get(`${baseURL}/mentor/pages/fetch`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchMentor: async function (id) {
        try {

            const res = await axios.get(`${baseURL}/mentor/page/${id}`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourses: async function () {
        try {
            const res = await axios.get(`${baseURL}/courses/fetch`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCourse: async function (id) {
        try {
            const res = await axios.get(`${baseURL}/course/${id}`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCategories: async function () {
        try {

            const res = await axios.get(`${baseURL}/categories`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchCategory: async function (data) {
        try {

            const res = await axios.get(`${baseURL}/category/${data}`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    searchCategories: async function (name) {
        try {
            const res = await axios.get(`${baseURL}/course/category/${name}/fetch`,
                {
                    headers: {
                        // "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchBootcamps: async function () {
        try {
            const res = await axios.get(`${baseURL}/user/bootcamps/fetch`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchTeachers: async function () {
        try {
            const res = await axios.get(`${baseURL}/teachers/fetch`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchTeacher: async function (id) {
        try {
            const res = await axios.get(`${baseURL}teacher/fetch/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchAdmin: async function () {
        try {
            const res = await axios.get(`${baseURL}/user/admins/fetch`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    validateURL: function (url) {
        const parsed = new URL(url)
        return ['https:', 'http:'].includes(parsed.protocol)
    },

    resetPasswordOTP: async function (_data) {
        const res = await axios.post(`${baseURL}/user/password/otp/send`,
            JSON.stringify(_data), {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: status => {
                return status >= 200 && status <= 505;
            }
        })
        return res
    },

    resetPassword: async function (_data) {
        const res = await axios.post(`${baseURL}/user/password/reset`,
            JSON.stringify(_data), {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: status => {
                return status >= 200 && status <= 505;
            }
        })
        return res
    },

    contactUs: async function (data) {
        try {
            const res = await axios.post(`${baseURL}/user/contact`, JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
}

export const consoleFunctions = {
    fetchDomains: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/domains/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addDomain: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/domain/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchContents: async function (token, domainId) {
        try {
            const res = await axios.get(`${baseURL}/classes/contents/${domainId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addContent: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/content/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
                console.log("something went wrong")
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchQuiz: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/contents/quiz/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addQuiz: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/content/quiz/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addFile: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/content/file/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchFile: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/contents/files/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addNote: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/content/note/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchNote: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/contents/notes/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchGroups: async function (token, id) {

        try {
            const res = await axios.get(`${baseURL}/classes/groups/${id}`,

                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    addGroup: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/group/add`, JSON.stringify(data),

                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    joinGroup: async function (token, id, data) {
        console.log(id);
        console.log(token);
        console.log({ data });
        try {
            const res = await axios.post(`${baseURL}/classes/group/join/${id}`, JSON.stringify({
                classId: data.classId,
                title: data.title,
                description: data.description
            }),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    markAsCompleted: async function (token, id) {

        try {
            const res = await axios.patch(`${baseURL}/classes/student/contents/files/mark/completed/${id}`, {
               id: JSON.stringify(id)
            },

                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchUserGroupstatus: async function (token, id) {

        try {
            // const res = await axios.get(`${baseURL}/classes/group/students/${id}`,
            const res = await axios.get(`${baseURL}/classes/group/students/636421f509beb648a9d7ea25`,

                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    fetchStudentDomains: async function (token, id) {

        try {
            const res = await axios.get(`${baseURL}/classes/student/domains/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchStudentContents: async function (token, domainId) {
        try {
            const res = await axios.get(`${baseURL}/classes/student/contents/${domainId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchStudentQuiz: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/student/contents/quiz/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchStudentFile: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/student/contents/files/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchStudentNote: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/student/contents/notes/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    messageAllStudents: async function (token, id, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/email/broadcast/${id}`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    fetchLiveSchedule: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/rooms/video/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

}

export const teacherConsoleFunctions = {

    sendMessage: async function (token, id, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/group/message/send/${id}`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    fetchMessages: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/group/messages/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchGroupStudents: async function (token, id) {
        try {
            const res = await axios.get(`${baseURL}/classes/group/students/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    fetchSuiteFiles: async function (token) {
        try {
            const res = await axios.get(`${baseURL}/classes/creator-suite/files`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },

    addFile: async function (token, data) {
        try {
            const res = await axios.post(`${baseURL}/classes/creator-suite/file/add`, JSON.stringify(data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })


            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    
    approveStudent: async function (token, id, _data) {
        try {
            const res = await axios.delete(`${baseURL}//classes/creator-suite/file/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
   
    deleteCreatorItem: async function ( token, id) {
        try {
            const res = await axios.delete(`${baseURL}/classes/creator-suite/file/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteDomain: async function ( token, id) {
        try {
            const res = await axios.delete(`${baseURL}/classes/domains/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    deleteContent: async function ( token, id) {
        try {
            const res = await axios.delete(`${baseURL}/classes/content/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return { ...res.data, success: true };
        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
    approveStudent: async function(token, id, _data){
        try{

            const res = await axios.patch(`${baseURL}/classes/group/approve/${id}`,
                JSON.stringify(_data),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    validateStatus: status => {
                        return status >= 200 && status <= 505;
                    }
                })

            if (res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }

        } catch (err) {
            if (err.statusCode === 2) {
                localStorage.clear()
            } else {

                return {
                    success: false,
                    message: err.message,
                    statusCode: err.statusCode
                }
            }
        }
    },
}