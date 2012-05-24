var qrModel = {    
    Size: {
        Data: ["150x150", "200x200", "250x250", "300x300"],
        Selected: 0
    },        
    Encoding: {
        Data: ["UTF-8", "ISO-8859-1", "Shift_JIS"],
        Selected: 0
    },
    Correction: {
        Data: ["L", "M", "Q", "H"],
        Selected: 3
    },
    InfoText: "Insert URL or your Short Text..",
    Text: ""
}

var googleAPI = {
    Param: ["?chid=","&chs=","&cht=","&choe=","&chld=","&chl="],
    URL: "https://chart.googleapis.com/chart"
}

var googleData = {
    cht: "qr",
    chs: "",
    chl:"",
    chld: "",
    choe: "",    
}

var qrOptionViewModel = function() {

    var self = this;
    self.optionSize = ko.observableArray(qrModel.Size.Data);
    self.selectedOptionSize = ko.observable(qrModel.Size.Data[qrModel.Size.Selected]);    
    
    self.optionEncoding = qrModel.Encoding.Data;
    self.selectedOptionEncoding = ko.observable(qrModel.Encoding.Data[qrModel.Encoding.Selected]);
    
    self.optionCorrection = qrModel.Correction.Data;
    self.selectedOptionCorrection = ko.observable(qrModel.Correction.Data[qrModel.Correction.Selected]);
    
    self.qrInfoText = qrModel.InfoText;
    self.qrText = ko.observable(qrModel.Text);
    
    self.chid = function(url){
        return url+(new Date()).getMilliseconds();
    }
        
    self.postOptions = function(formElement) {
    
        googleData.chl = self.qrText();
        googleData.chld = self.selectedOptionCorrection();
        googleData.chs = self.selectedOptionSize();
        googleData.choe = self.selectedOptionEncoding();
                
        var ctx = $('canvas')[0].getContext("2d");       
        var image = new Image();
        ctx.clearRect(0, 0, 300, 300);              
               
        var url = self.chid(googleAPI.URL + googleAPI.Param[0]) + googleAPI.Param[1];
        url += googleData.chs + googleAPI.Param[2];
        url += googleData.cht + googleAPI.Param[3];
        url += googleData.choe + googleAPI.Param[4];
        url += googleData.chld + googleAPI.Param[5];
        url += googleData.chl;
        image.src = url;               
        
        /*$.post(self.chid(googleAPI.URL), googleData, function(data) {            
            image.src = data;                                                                        
        });*/
        
        $(image).load(function() {          
                ctx.drawImage(image, 0, 0);                
        });                           
    };
};

ko.applyBindings(new qrOptionViewModel);
