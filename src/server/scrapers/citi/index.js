import cherrio from 'cheerio';
import request from 'superagent';


// const $ = cheerio.load('');



export const scrape = (callback) => {
    const agent = request.agent();

    const loadLoginPage = () => {
        agent.get('https://online.citi.com/US/login.do')
            .end((err, res) => {
                console.log(res.text);
                const $ = cherrio.load(res.text);
                const $form = $('[name=SignonForm]');
                const $hidden = $form.find('[type=hidden]');

                const hiddenValues = [];
                $hidden.each(function(i, el) {
                    console.log($(this));
                    hiddenValues.push({
                        name: $(this).attr('name'),
                        value: $(this).val()
                    });
                });
                callback(null, res.text);
            });
    };

    const loadTransactions = (err, response) => {
        if (err) {
            return callback(err);
        }

console.log(response.headers);
console.log(response.status);
callback(null, response.status);
        // agent.get('https://online.citi.com/US/CBOL/ain/caraccdet/flow.action')
        //     .end((err, res) => {
        //         if (err) {
        //             return callback(err);
        //         }
        //         console.log(res.text);
        //         callback(null, 'done');
        //     });
    };

    agent.post('https://online.citi.com/US/JSO/signon/ProcessUsernameSignon.do')
       .send('username=jrussom')
       .send('password=GLaDOS314!')
       .send('XXX_Extra=8a9c99b')
       .send('XYZ_Extra=288_777738382b6')
       .end(loadTransactions);
    // loadLoginPage(callback);
}
