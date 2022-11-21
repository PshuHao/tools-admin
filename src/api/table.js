import request from '@/utils/request'

export function getCenter(params) {
    return request({
        url: '/center',
        method: 'get',
        // params
    })
}
export function getList(params) {
    return request({
        url: '/disk/list',
        method: 'get',
        // params
    })
}
export function getRefresh(params) {
    return request({
        url: '/disk/refresh',
        method: 'get',
        // params
    })
}
export function getRaidType() {
    return request({
        url: '/raid/type',
        method: 'get',
    })
}
export function getAvailable() {
    return request({
        url: '/disk/available',
        method: 'get',
    })
}
export function addRaid(data) {
    console.log('addRaid', data);
    return request({
        url: '/raid/add',
        method: 'post',
        data
    })
}
export function getRaidList(data) {
    return request({
        url: '/raid/list',
        method: 'get',
    })
}
export function delRaid(data) {
    console.log(88888, data);
    return request({
        url: "/raid/del",
        method: 'post',
        data
    })
}
export function delErrorRaid(data) {
    console.log('delErrorRaid', data);
    return request({
        url: "/raid/delError",
        method: 'post',
        data
    })
}
export function addVolume(data) {
    return request({
        url: '/volume/add',
        method: 'post',
        data
    })
}
export function getVolumeList(data) {
    return request({
        url: '/volume/list',
        method: 'get',
        params: data
    })
}
export function detailVolume(data) {
    console.log('detailVolume', data);
    return request({
        url: '/volume/detail',
        method: 'get',
        params: data
    })
}

export function delVolume(data) {
    console.log('delVolume', data);
    return request({
        url: '/volume/del',
        method: 'post',
        data
    })
}

export function addNfs(data) {
    console.log(data);
    return request({
        url: '/nfs/add',
        method: 'post',
        data
    })
}
export function getNfsList(data) {
    console.log('getNfsList', data);
    return request({
        url: '/nfs/list',
        method: 'get',
        params: data
    })
}
export function delNfs(data) {
    return request({
        url: '/nfs/del',
        method: 'post',
        data
    })
}
export function getUserList(data) {
    return request({
        url: '/cifs/userList',
        method: 'get',
        params: data
    })
}
export function addCifsUser(data) {
    return request({
        url: '/cifs/addUser',
        method: 'post',
        data
    })
}
export function delCifsUser(data) {
    return request({
        url: '/cifs/delUser',
        method: 'post',
        data
    })
}
export function getCifsList(data) {
    return request({
        url: '/cifs/getCifsList',
        method: 'get',
        params: data
    })
}
export function delCifs(data) {
    return request({
        url: '/cifs/delCifs',
        method: 'post',
        data
    })
}
export function getAjaxCifsUserList(data) {
    return request({
        url: '/cifs/ajaxUserList',
        method: 'get'
    })
}
export function setCifs(data) {
    return request({
        url: '/cifs/setCifs',
        method: 'post',
        data
    })
}
export function getIscsiDiscoverylist(data) {
    return request({
        url: '/iscsi/discoverylist',
        method: 'get',
    })
}
export function setIscsiDiscovery(data) {
    return request({
        url: '/iscsi/discoverySet',
        method: 'post',
        data
    })
}
export function editIscsiDiscovery(data) {
    return request({
        url: '/iscsi/discoveryEdit',
        method: 'post',
        data
    })
}
export function delIscsiDiscovery(data) {
    return request({
        url: '/iscsi/discoveryDel',
        method: 'post',
        data
    })
}
export function getClearList(data) {
    return request({
        url: '/clear/getList',
        method: 'get',
        params: data
    })
}
export function addClear(data) {
    return request({
        url: '/clear/add',
        method: 'post',
        data
    })
}
export function delClear(data) {
    console.log('delClear', data);
    return request({
        url: '/clear/del',
        method: 'post',
        data
    })
}
export function editClear(data) {
    console.log('editClear', data);
    return request({
        url: '/clear/edit',
        method: 'post',
        data
    })
}
export function detailClear(data) {
    console.log('detailClear', data);
    return request({
        url: '/clear/detail',
        method: 'get',
        params: data
    })
}
export function getIscsiList(data) {
    return request({
        url: '/iscsi/getIscsiList',
        method: 'get',
        params: data
    })
}
export function setIscsi(data) {
    console.log('setIscsi', data);
    return request({
        url: '/iscsi/iscsiSet',
        method: 'post',
        data
    })
}
export function editIScsi(data) {
    console.log('editIScsi', data);
    return request({
        url: '/iscsi/iscsiEdit',
        method: 'post',
        data
    })
}
export function detailIScsi(data) {
    console.log('detailIScsi', data);
    return request({
        url: '/iscsi/iscsiDetail',
        method: 'get',
        params: data
    })
}
export function delIScsi(data) {
    console.log('delIScsi', data);
    return request({
        url: '/iscsi/iscsiDel',
        method: 'post',
        data
    })
}
export function getDrdbPairDetail() {
    return request({
        url: '/drdb/pairDetail',
        method: 'get',
    })
}
export function setDrdbPair(data) {
    console.log('setDrdbPair', data);
    return request({
        url: '/drdb/pairSet',
        method: 'post',
        data
    })
}
export function delDrdbPair(data) {
    console.log('delDrdbPair', data);
    return request({
        url: '/drdb/pairDel',
        method: 'post',
        data
    })
}
export function editDrdbPair(data) {
    console.log('editDrdbPair', data);
    return request({
        url: '/drdb/pairEdit',
        method: 'post',
        data
    })
}
export function execDrdbPair(data) {
    console.log('execDrdbPair', data);
    return request({
        url: '/drdb/pairExec',
        method: 'post',
        data
    })
}
//双活策略
export function getDrdbList(data) {
    return request({
        url: '/drdb/drdbList',
        method: 'get',
        params: data
    })
}
export function setDrdb(data) {
    console.log('setDrdb', data);
    return request({
        url: '/drdb/drdbSet',
        method: 'post',
        data
    })
}
export function getDrdbLocalHost(data) {
    console.log('getDrdbLocalHost', data);
    return request({
        url: '/drdb/getLocalHost',
        method: 'get',
    })
}
export function getDrdbPeerHost(data) {
    console.log('getDrdbPeerHost', data);
    return request({
        url: '/drdb/getPeerHost',
        method: 'get',
    })
}
export function getVolumeAll() {
    return request({
        url: '/volume/all',
        method: 'get',
    })
}
export function editDrdb(data) {
    console.log('editDrdb', data);
    return request({
        url: '/drdb/drdbEdit',
        method: 'post',
        data
    })
}
export function detailDrdb(data) {
    console.log('detailDrdb', data);
    return request({
        url: '/drdb/drdbDetail',
        method: 'get',
        params: data
    })
}
export function delDrdb(data) {
    console.log('delDrdb', data);
    return request({
        url: '/drdb/drdbDel',
        method: 'post',
        data
    })
}
//备份策略
export function getBackupList(data) {
    return request({
        url: '/backup/getList',
        method: 'get',
        params: data
    })
}
export function addBackup(data) {
    console.log('addBackup', data);
    return request({
        url: '/backup/add',
        method: 'post',
        data
    })
}
export function delBackup(data) {
    console.log('delBackup', data);
    return request({
        url: '/backup/del',
        method: 'post',
        data
    })
}
export function editBackup(data) {
    console.log('editBackup', data);
    return request({
        url: '/backup/edit',
        method: 'post',
        data
    })
}
export function detailBackup(data) {
    console.log('detailBackup', data);
    return request({
        url: '/backup/detail',
        method: 'get',
        params: data
    })
}
export function clearLog(data) {
    console.log('clearLog', );
    return request({
        url: '/clear/log',
        method: 'get',
        params: data
    })
}
export function backupLog(data) {
    console.log('backupLog', data);
    return request({
        url: '/backup/log',
        method: 'get',
        params: data
    })
}
export function delDisk(data) {
    console.log('delDisk', );
    return request({
        url: '/disk/del',
        method: 'post',
        data
    })
}
export function clearDisk(data) {
    console.log('clearDisk', );
    return request({
        url: '/disk/clear',
        method: 'post',
        data
    })
}
export function ntpSet(data) {
    console.log('ntpSet', data);
    return request({
        url: '/sys/ntp',
        method: 'post',
        data
    })
}
export function ntpInfo(data) {
    console.log('ntpInfo', data);
    return request({
        url: '/sys/ntpinfo',
        method: 'get',
    })
}