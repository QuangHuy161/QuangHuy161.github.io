// scrapeFunciton('https://ncov.moh.gov.vn/')
const apiCaBenh = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
const apiKhuVuc = 'https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST';
Promise.all([
    fetch(apiCaBenh),
    fetch(apiKhuVuc)
]).then(function(responses) {
    return Promise.all(responses.map(function(response) {
        return response.json();
    }));
}).then(function(data) {
    const caBenhArr = new Array();
    const khuVucArr = new Array();
    //push data into array
    caBenhArr.push(data[0]['detail']);
    khuVucArr.push(data[1]['key']);
    // sort two arr
    qSort(khuVucArr[0], 0, khuVucArr[0].length - 1)
    qSort1(caBenhArr[0], 0, caBenhArr[0].length - 1)
    console.log(caBenhArr[0]);
    str_data = ""
    for (const el of caBenhArr[0]) {
        t = Bsearch(khuVucArr[0], el['hc-key'])
        if (t != -1)
            if (el['hc-key'] == khuVucArr[0][t]['hec-key']) {
                str_data += `
                <tr>
                    <td>${khuVucArr[0][t]['name']}</td>
                    <td>${el['socakhoi']}</td>
                    <td>${el['socatuvong']}</td>
                    <td>${el['value']}</td>
                </tr>
                `
            }

    }
    Stat_Table = `
    <div class="stat_table hide_scrollbar">
        <table class="table table-striped ">
            <thead>
                <tr>
                    <th scope="col">Khu vực</th>
                    <th scope="col">Ca mắc mới</th>
                    <th scope="col">Tử vong</th>
                    <th scope="col">Tổng</th>
                </tr>
            </thead>
            <tbody>
                ${str_data}
            </tbody>
        </table>
    </div>
    `;
    //Show data on screen
    document.querySelector('.stat').insertAdjacentHTML('beforeEnd', Stat_Table)

}).catch(function(error) {
    console.log(error);
});