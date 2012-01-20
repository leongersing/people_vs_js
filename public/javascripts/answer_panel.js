var Views = (function(ns){

  var AnswerPanel = function(containerEl, messageBus){
    this.$container = containerEl;
    this.messageBus = messageBus;

    this.renderInit();
  }
  AnswerPanel.prototype = {
    bindEvents: function(){
      this.messageBus.on("question-changed", _.bind(this.renderAnswers, this));
      /* this.$answerContainer.on("", _.bind(this.sendMessage, this)); */
      this.$submitAnswerButton.on("click", _.bind(this.submitAnswer, this));
    },

    renderInit: function(data){
      this.$container.empty();
      var $panel_content =  $(Templates.render('answer_panel')).appendTo(this.$container);
      this.$answerContainer = $panel_content.find("#answer_container");
      this.$submitAnswerButton = $panel_content.find("#final_answer");

      this.bindEvents();
    },

    renderAnswers: function(answers){
      var html = $(Templates.render('answer_list_items', answers));
      this.$answerContainer.empty().append(html);
    },

    submitAnswer: function(){
      var answerIndex = this.$answerContainer.find("input[name=my_answer]:checked").index("input[name=my_answer]");
      this.messageBus.emit('answer-submitted', {answerIndex: answerIndex}, _.bind(this.answerSubmitted, this));
    },

    answerSubmitted: function(data){
      var answerIndex = this.$answerContainer.find("input[name=my_answer]").map(function(idx, elem) { if($(elem).is(":checked")) return idx; })[0];
      if (answerIndex != data.correctIndex){
        this.$answerContainer.find(".possibleAnswer:eq(" + answerIndex + ")").addClass('incorrect');
      }

      this.$answerContainer.find(".possibleAnswer:eq(" + data.correctIndex + ")").addClass('correct');
    }
  };


  ns.AnswerPanel = AnswerPanel;
  return ns;

})(Views || {});
