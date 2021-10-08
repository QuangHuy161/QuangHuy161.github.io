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
    const caBenhArr = [];
    const khuVucArr = [];
    //push data into array
    caBenhArr.push(data[0]['detail']);
    khuVucArr.push(data[1]['key']);
    sortKhuVUc = [];
    for (const t of khuVucArr[0]) {
        sortKhuVUc.push(t)
    };
    sortKhuVUc.sort(function(a, b) {
        return a['hec-key'] - b['hec-key']
    });
    str_data = ""
    for (const el of caBenhArr[0]) {
        str_data += `
                <tr>
                    <td>${el['name']}</td>
                    <td>${el['casesToday']}</td>
                    <td>${el['death']}</td>
                    <td>${el['cases']}</td>
                </tr>
                `
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