const histories = [
    {
        date: '10/15/20',
        routes: [
            {
                name: 'TPS Terpadu',
                address: 'Jl. Babakan Sari 1 No.64, Babakan Sari, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40272'
            },
            {
                name: 'TPS Jalan Ambon',
                address: 'Jl. Ambon, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115'
            },
            {
                name: 'TPS antapani',
                address: 'Jl. Indramayu No.3, Antapani Kidul, Kec. Antapani, Kota Bandung, Jawa Barat 40291'
            }
        ]
    },
    {
        date: '10/21/20',
        routes: [
            {
                name: 'TPS Pasar Ciwastra',
                address: 'Mekarjaya, Kec. Rancasari, Kota Bandung, Jawa Barat 40292'
            },
            {
                name: 'TPS Cempaka Arum',
                address: 'Jl. Ali Bin Abi Tholib, Rancanumpang, Kec. Gedebage, Kota Bandung, Jawa Barat 40292'
            }
        ]
    },
    {
        date: '10/19/20',
        routes: [
            {
                name: 'TPS Sauyunan Hegarmanah',
                address: 'Jl. Raya Jatinangor No.230, Hegarmanah, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363'
            }
        ]
    },
    {
        date: '10/18/20',
        routes: [
            {
                name: 'TPA SARIMUKTI',
                address: 'Sarimukti, Kec. Cipatat, Kabupaten Bandung Barat, Jawa Barat 40554'
            }
        ]
    },
    {
        date: '10/17/20',
        routes: [
            {
                name: 'Tempat Pembuangan Sampah Pengarengan',
                address: 'Jl. Raya Jatinangor No.230, Hegarmanah, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363'
            }
        ]
    },
    {
        date: '10/16/20',
        routes: [
            {
                name: 'TPA Cijeruk Kab. Sumedang',
                address: 'Cijeruk, Kec. Pamulihan, Kabupaten Sumedang, Jawa Barat 45365'
            }
        ]
    }
]

export function fetchHistory () {
    return (dispatch, getState) => {
        dispatch({
            type: 'FETCH_HISTORIES',
            data: histories
        })
    }
}

export function updateHistory(location) {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_TODAY_HISTORY',
            location
        })
    }    
}

export function updateAllHistory(date) {
    return (dispatch, getState) => {
        let date = new Date().toLocaleDateString()
        const todayHistory = getState().historyReducer.todayHistory
        const data = {
            date,
            routes: todayHistory
        }
        dispatch({
            type: 'UPDATE_HISTORIES',
            data
        })
    }    
}