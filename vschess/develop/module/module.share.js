// 创建棋谱分享区域
fn.createShare = function(){
	var _this = this;
	this.shareTitle    = $('<div class="vschess-tab-title vschess-tab-title-share">棋谱分享</div>');
	this.shareArea     = $('<div class="vschess-tab-body vschess-tab-body-share"></div>');
	this.tabArea.children(".vschess-tab-title-share, .vschess-tab-body-share").remove();
	this.tabArea.append(this.shareTitle);
	this.tabArea.append(this.shareArea );
	this.shareTitle.bind(this.options.click, function(){ _this.showTab("share"); });
	this.createShareGenerateButton();
	this.createShareUBB();
	return this;
};

// 创建生成分享信息按钮
fn.createShareGenerateButton = function(){
	var _this = this;
	this.shareGenerateButton = $('<input type="button" class="vschess-button vschess-tab-body-share-generate-button" value="生成分享代码" />');
	this.shareGenerateButton.appendTo(this.shareArea);

	this.shareGenerateButton.bind(this.options.click, function(){
		if (_this.options.cloudApi && _this.options.cloudApi.saveBookForShare) {
			_this.rebuildExportDhtmlXQ();

			$.ajax({
				url: _this.options.cloudApi.saveBookForShare,
				type: "post",
				data: { book: _this.exportData.DhtmlXQ },
				dataType: "json",
				success: function(response){
					if (response.code === 0) {
						_this.shareUBBText.val("[" + _this.options.ubbTagName + "]" + response.data.id + "[/" + _this.options.ubbTagName + "]");
					}
				},
				error: function(){
					alert("您的浏览器不允许跨域，不能使用此功能。");
				}
			});
		}
	});

	return this;
};

// 创建 UBB 分享信息区域
fn.createShareUBB = function(){
	this.shareUBBTitle = $('<div class="vschess-tab-body-share-title">论坛 UBB 代码：</div>');
	this.shareUBBTitle.appendTo(this.shareArea);
	this.shareUBBText = $('<input class="vschess-tab-body-share-text" value="请点击“生成分享代码”按钮。" readonly="readonly" />');
	this.shareUBBText.appendTo(this.shareArea);
	return this;
};