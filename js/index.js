let output = document.querySelector('#output');

window.onload = function () {
    callApi();
};

async function callApi()
{
    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            // Data is binnen in JSON-format
            for (let index = 0; index < data.length; index++) {
                let template = `
                    <a href="comments.html?id=${data[index].id}" class="collection-item avatar collection-link">
                        <img src="img/icon-php.png" alt="" class="circle">
                        <div class="row">
                            <div class="col s9">
                            <div class="row last-row">
                                <div class="col s12">
                                <span class="title">
                                    <!-- Hier komt de titel van de POST -->
                                    ${data[index].title}
                                </span>
                                <p>
                                    <!-- Hier plaats je de body van de POST -->
                                    ${data[index].body}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </a>
                `;

                output.innerHTML += template;
            }
        })
        .catch(error => console.log(error));
}