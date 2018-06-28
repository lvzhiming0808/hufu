/* eslint-disable */
$(function() {
  var ids = {
    firstStrategyPhase: '',
    secStrategyPhase: '',
    finalStrategyPhase: ''
  }
  var URLS = window.location.href
  var obj = {};
  var pdfs=""
  URLS.substr(URLS.indexOf('?') + 1).split('&').forEach(function(item, index) {
    ret = item.split('=')
    obj[ret[0]] = ret[1]
  })
  if(obj.share==0){
    countdown = 30
    $.ajax({
      url: obj.baseurl + '/api/v2/strategies/externallink/' + obj.strategyId + '?workNum=' + obj.receiveUser + '&msgId=' + obj.msgId,
      type: 'get',
      success: function(res) {
        $('.areaName').text(res.strategy.areaName)
        $('.topProject').text(res.strategy.firstProjectName)
        $('.pageTitle').text(res.strategy.name)
        $('.titlle').text(res.strategy.name)
        isReadStatus = res.strategy.studyStatus
        if (isReadStatus == 2) { // 首次进入，未知悉，未学习
          $('.mask').show()
          $('body').css('overflow', 'hidden')
          isKnow()
        } else if (isReadStatus == 0) { // 已知悉，未学习
          getWheel()
          $('.mask').hide()
          var timer1 = setInterval(function() {
            if (this.countdown <= 0) {
              clearInterval(timer1)
              $('.times').text('')
              $('.study').css({ 'background': '#f79300', 'color': '#fff' })
              isStudy()
              return false
            } else {
              this.countdown--
              $('.times').text(this.countdown + 's')
              return false
            }
          }, 1000)
        } else if (isReadStatus == 1) {
          getWheel()
          $('.mask').hide()
          $('body').css('overflow', 'auto')
          $('.study').text('已学习').css({ 'background': '#e2e2e2' })
        }
             // fileName=res.firstStrategyPhase.fileName  pdf文件名
        ids = [
          obj.baseurl + '/api/v2/strategies/externallink/' + res.firstStrategyPhase.id + '/viewPDF',
          obj.baseurl + '/api/v2/strategies/externallink/' + res.secStrategyPhase.id + '/viewPDF',
          obj.baseurl + '/api/v2/strategies/externallink/' + res.finalStrategyPhase.id + '/viewPDF'
        ]
        $('#plugin').attr('src', ids[0])
        $(".ieDownlod a").attr('href',ids[0])
        getFirst(res)
        getWeek(res)
        kuaqi(res)
        getName(res)
      },
      error: function(res) {
        console.log('请求失败')
      }
    })
    var ind = 0
    $('.pdfPage').eq(0).show()
    $('.list_nav li').eq(0).addClass('active')
    $('.list_nav').on('click', 'li', function() {
      ind = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      $('.list_main .list_one').eq(ind).hide().siblings('.list_one').hide()
      $('#plugin').attr('src', ids[ind])
      $(".ieDownlod a").attr('href',ids[ind])
      if ($('.btn1').children('i').hasClass('top-arrow')) {
        $('.btn1').children('i').removeClass('top-arrow').addClass('bottom-arrow')
      }
    })
    $('.btn1').on('click', function() {
      if ($(this).children('i').hasClass('bottom-arrow')) {
        $(this).children('i').removeClass('bottom-arrow').addClass('top-arrow')
      } else {
        $(this).children('i').removeClass('top-arrow').addClass('bottom-arrow')
      }
      if ($('.list_one').eq(ind).css('display') == 'none') {
        $('.list_one').eq(ind).show()
      } else {
        $('.list_one').eq(ind).hide()
      }
    })
  }else{ 
    $(".wrapper-main").addClass("wrapper-main-bg")
     $.ajax({
      url: obj.baseurl + '/api/v2/strategies/externallink/' + obj.strategyId + '?workNum=' + obj.receiveUser + '&msgId=' + obj.msgId,
      type: 'get',
      success: function(res) {
        $('.areaName').text(res.strategy.areaName)
        $('.topProject').text(res.strategy.firstProjectName)
        $('.pageTitle').text(res.strategy.name)
        $('.titlle').text(res.strategy.name)
        ids = [
          obj.baseurl + '/api/v2/strategies/externallink/' + res.firstStrategyPhase.id + '/viewPDF',
          obj.baseurl + '/api/v2/strategies/externallink/' + res.secStrategyPhase.id + '/viewPDF',
          obj.baseurl + '/api/v2/strategies/externallink/' + res.finalStrategyPhase.id + '/viewPDF'
        ]
        $('#plugin').attr('src', ids[0])
        $(".ieDownlod a").attr('href',ids[0])
        getFirst(res)
        getWeek(res)
        kuaqi(res)
        getName(res)
      },
      error: function(res) {
        console.log('请求失败')
      }
    })
    var ind = 0
    $('.pdfPage').eq(0).show()
    $('.list_nav li').eq(0).addClass('active')
    $('.list_nav').on('click', 'li', function() {
      ind = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      $('.list_main .list_one').eq(ind).hide().siblings('.list_one').hide()
      $('#plugin').attr('src', ids[ind])
      $(".ieDownlod a").attr('href',ids[ind])
      if ($('.btn1').children('i').hasClass('top-arrow')) {
        $('.btn1').children('i').removeClass('top-arrow').addClass('bottom-arrow')
      }
    })
    $('.btn1').on('click', function() {
      if ($(this).children('i').hasClass('bottom-arrow')) {
        $(this).children('i').removeClass('bottom-arrow').addClass('top-arrow')
      } else {
        $(this).children('i').removeClass('top-arrow').addClass('bottom-arrow')
      }
      if ($('.list_one').eq(ind).css('display') == 'none') {
        $('.list_one').eq(ind).show()
      } else {
        $('.list_one').eq(ind).hide()
      }
    })
  }
  
  if(window.navigator.userAgent.indexOf("Trident")>=1){
      $("#plugin").hide()
      $(".ieDownlod").show()
    }else{
      $(".ieDownlod").hide()
    }
  function isKnow() {
    $('.Konw').on('click', function() {
      getWheel()
      getTime()
      $('body').css('overflow', 'auto')
      $.ajax({
        url: obj.baseurl + '/api/v2/strategies/externallink/' + obj.strategyId + '/study?workNum=' + obj.receiveUser + '&studyStatus=0',
        type: 'post',
        success: function(res) {
        }
      })
    })
  }
  function getTime() {
    $('.mask').hide()
    var timer = setInterval(function() {
      if (this.countdown <= 0) {
        clearInterval(timer)
        $('.times').text('')
        $('.study').css({ 'background': '#f79300', 'color': '#fff' })
        isStudy()
        return false
      } else {
        this.countdown--
        $('.times').text(this.countdown + 's')
      }
    }, 1000)
  }
  function isStudy() {
    $('.study').on('click', function() {
      $(this).text('已学习').css({ 'background': '#ccc' })
      getStudy()
      return false
    })
  }
  function getStudy() {
    $.ajax({
      url: obj.baseurl + '/api/v2/strategies/externallink/' + obj.strategyId + '/study?workNum=' + obj.receiveUser + '&studyStatus=1',
      type: 'post',
      success: function(res) {

      }
    })
  }
  function getFirst(res) {
    var str1 = '', str2 = '', str3 = '', str4 = ''
    $.each(res.firstStrategyPhase.needs, function(i, val) {
      str1 += '<li>' + val.needName + '</li>'
      $('.needs').html(str1)
    })
    $('.main-project').text(res.strategy.projectType + ':')
    $.each(res.firstStrategyPhase.secondProjects, function(i, val) {
      str2 += '<li>' + val.description + '</li>'
      $('.mainProject').html(str2)
    })
    $.each(res.firstStrategyPhase.mainClassSizes, function(i, val) {
      str3 += '<li>' + val.description + '</li>'
      $('.mainClass').html(str3)
    })
    $.each(res.firstStrategyPhase.killStrategies, function(i, val) {
      str4 += '<li>' + val.description + '</li>'
      $('.kill').html(str4)
    })
  }
  function getWeek(res) {
    var str1 = '', str2 = '', str3 = '', str4 = ''
    $.each(res.secStrategyPhase.needs, function(i, val) {
      str1 += '<li>' + val.needName + '</li>'
      $('.rember').html(str1)
    })
    $.each(res.secStrategyPhase.solveFirstProblems, function(i, val) {
      str2 += '<li>' + val.solve + '</li>'
      $('.solved').html(str2)
    })
    $.each(res.secStrategyPhase.mainClassSizes, function(i, val) {
      str3 += '<li>' + val.description + '</li>'
      $('.week_mainProject').html(str3)
    })
    $.each(res.secStrategyPhase.killStrategies, function(i, val) {
      str4 += '<li>' + val.description + '</li>'
      $('.week_kills').html(str4)
    })
  }
  function kuaqi(res) {
    var str1 = '', str2 = '', str3 = '', str4 = ''
    $.each(res.finalStrategyPhase.triggerOpens, function(i, val) {
      str1 += '<li>' + val.triggerOpen + '</li>'
      $('.open').html(str1)
    })
    $.each(res.finalStrategyPhase.assistTools, function(i, val) {
      str2 += '<li>' + val.tool + '</li>'
      $('.tools').html(str2)
    })
    $.each(res.finalStrategyPhase.mainClassSizes, function(i, val) {
      str3 += '<li>' + val.description + '</li>'
      $('.kuaqi_mainProject').html(str3)
    })
    $.each(res.finalStrategyPhase.killStrategies, function(i, val) {
      str4 += '<li>' + val.description + '</li>'
      $('.kuaqi_kills').html(str4)
    })
  }
  function getWheel() {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
      document.body.addEventListener('DOMMouseScroll', function(e) {
        e = e || window.event
        var wheelDelta = -e.detail * 24
        if (wheelDelta > 0) {
          $('.floatBox').slideUp(500)
        } else {
          $('.floatBox').slideDown(500)
        }
      })
    } else {
      document.onmousewheel = function(e) {
        e = e || window.event
        var wheelDelta = e.wheelDelta
        if (wheelDelta > 0) {
          $('.floatBox').slideUp(500)
        } else {
          $('.floatBox').slideDown(500)
        }
      }
    }
  }
  var arr = [], strs = ''
  function getName(res) {
    $.each(res.strategy.applydeparts, function(i, val) {
        if(val.item.length==0){
            strs = val.name
            arr.push(strs)
        }else{
            $(val.item).each(function(key, vals) {
                strs = val.name + vals.name
                arr.push(strs)
            })
        }
      $('.deparement').text(arr.toString())
    })
  }
})
