module.exports = {
    
  'Demo Test' : function (client) {
    client
        //.url('http://192.168.1.80:8888/chemistrylearning1/states/')
      //.url('http://192.168.0.11:8888/chemistrylearning1/states/')
	  //.url('http://127.0.0.1:4444/xenon/')
	  //.url("https://github.com/soft-eng-practicum/chemistrylearning1.git", XENON)
	  //.url("https://soft-eng-practicum.github.io/xenon/")
	  .url('http://127.0.0.1:8080')
	  //.url('http://127.0.0.1:55418')
	 //.url('http://127.0.0.1:56193/') 
	  
      .waitForElementVisible('body', 1000)
      .assert.title('XENON')
      .end();
  }
};