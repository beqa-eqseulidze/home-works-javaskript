const votes = ['yes', 'no', 'yes', 'maybe', 'yes', 'no', 'absent'];

const result = votes.reduce((pre, vote) => {
    if (pre[vote]) {
        pre[vote] = pre[vote] + 1;
    }
    else {
        pre[vote] = 1;
    }
    return pre;
}, 0);

console.log(result)