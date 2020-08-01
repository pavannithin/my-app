export function fetchProducts() {
    return async function (dispatch) {
        console.log("Fetching Products");
        dispatch({
            type: "PRODUCTS_REQUESTED"
        })
        try {
            const url = "/products.JSON"
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': `application.json`
                },
                'credentials': "include"
            }).then((data) => {
                return data.json();
            }).then((data) => {
                // console.log("respon=", respon);
                dispatch({
                    type: "PRODUCTS_RECEIVED",
                    data
                })
            });
            // const data = response.json();
            // console.log("Products Received= ", data);
        } catch (e) {
            console.log("Products fetching Failed= ", e);
            dispatch({
                type: "PRODUCTS_REQUESTED_FAILED",
            })
        }
    }
}