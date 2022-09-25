type CsvHeader = { label: string; key: string }
export type JinjaCsv = {
  name: string
  adId: string
  date: string
  gId: string
  gName: string
  start: string
  end: string
}
export const JINJA_HEADERS: CsvHeader[] = [
  { label: '名前', key: 'name' },
  { label: '*従業員ID', key: 'adId' },
  { label: '*年月日', key: 'date' },
  { label: '*打刻グループID', key: 'gId' },
  { label: '所属グループ名', key: 'gName' },
  { label: 'スケジュール雛形ID', key: 'h1' },
  { label: '出勤予定時刻', key: 'start' },
  { label: '退勤予定時刻', key: 'end' },
  { label: '休憩予定時刻1', key: 'h2' },
  { label: '復帰予定時刻1', key: 'h3' },
  { label: '休憩予定時刻2', key: 'h4' },
  { label: '復帰予定時刻2', key: 'h5' },
  { label: '休憩予定時刻3', key: 'h6' },
  { label: '復帰予定時刻3', key: 'h7' },
  { label: '休憩予定時刻4', key: 'h8' },
  { label: '復帰予定時刻4', key: 'h9' },
  { label: '休憩予定時刻5', key: 'h10' },
  { label: '復帰予定時刻5', key: 'h11' },
  { label: 'スケジュール外休憩予定時刻', key: 'h12' },
  { label: 'スケジュール外復帰予定時刻', key: 'h13' },
  { label: '休日（0: 法定休日1: 所定休日）', key: 'h14' },
  { label: '出勤1', key: 'h15' },
  { label: '退勤1', key: 'h16' },
  { label: '出勤2', key: 'h17' },
  { label: '退勤2', key: 'h18' },
  { label: '出勤3', key: 'h19' },
  { label: '退勤3', key: 'h20' },
  { label: '出勤4', key: 'h21' },
  { label: '退勤4', key: 'h22' },
  { label: '出勤5', key: 'h23' },
  { label: '退勤5', key: 'h24' },
  { label: '出勤6', key: 'h25' },
  { label: '退勤6', key: 'h26' },
  { label: '出勤7', key: 'h27' },
  { label: '退勤7', key: 'h28' },
  { label: '出勤8', key: 'h29' },
  { label: '退勤8', key: 'h30' },
  { label: '出勤9', key: 'h31' },
  { label: '退勤9', key: 'h32' },
  { label: '出勤10', key: 'h33' },
  { label: '退勤10', key: 'h34' },
  { label: '休憩1', key: 'h35' },
  { label: '復帰1', key: 'h36' },
  { label: '休憩2', key: 'h37' },
  { label: '復帰2', key: 'h38' },
  { label: '休憩3', key: 'h39' },
  { label: '復帰3', key: 'h40' },
  { label: '休憩4', key: 'h41' },
  { label: '復帰4', key: 'h42' },
  { label: '休憩5', key: 'h43' },
  { label: '復帰5', key: 'h44' },
  { label: '休憩6', key: 'h45' },
  { label: '復帰6', key: 'h46' },
  { label: '休憩7', key: 'h47' },
  { label: '復帰7', key: 'h48' },
  { label: '休憩8', key: 'h49' },
  { label: '復帰8', key: 'h50' },
  { label: '休憩9', key: 'h51' },
  { label: '復帰9', key: 'h52' },
  { label: '休憩10', key: 'h53' },
  { label: '復帰10', key: 'h54' },
  { label: '食事1開始', key: 'h55' },
  { label: '食事1終了', key: 'h56' },
  { label: '食事2開始', key: 'h57' },
  { label: '食事2終了', key: 'h58' },
  { label: '外出1', key: 'h59' },
  { label: '再入1', key: 'h60' },
  { label: '外出2', key: 'h61' },
  { label: '再入2', key: 'h62' },
  { label: '外出3', key: 'h63' },
  { label: '再入3', key: 'h64' },
  { label: '外出4', key: 'h65' },
  { label: '再入4', key: 'h66' },
  { label: '外出5', key: 'h67' },
  { label: '再入5', key: 'h68' },
  { label: '外出6', key: 'h69' },
  { label: '再入6', key: 'h70' },
  { label: '外出7', key: 'h71' },
  { label: '再入7', key: 'h72' },
  { label: '外出8', key: 'h73' },
  { label: '再入8', key: 'h74' },
  { label: '外出9', key: 'h75' },
  { label: '再入9', key: 'h76' },
  { label: '外出10', key: 'h77' },
  { label: '再入10', key: 'h78' },
  { label: '休日休暇名1', key: 'h79' },
  { label: '休日休暇名1：種別', key: 'h80' },
  { label: '休日休暇名1：開始時間', key: 'h81' },
  { label: '休日休暇名1：終了時間', key: 'h82' },
  { label: '休日休暇名1：理由', key: 'h83' },
  { label: '休日休暇名2', key: 'h84' },
  { label: '休日休暇名2：種別', key: 'h85' },
  { label: '休日休暇名2：開始時間', key: 'h86' },
  { label: '休日休暇名2：終了時間', key: 'h87' },
  { label: '休日休暇名2：理由', key: 'h88' },
  { label: '打刻時コメント', key: 'h89' },
  { label: '管理者備考', key: 'h90' },
  { label: '勤務状況（0: 未打刻1: 欠勤）', key: 'h91' },
  { label: '遅刻処理の有無（0: 無1: 有）', key: 'h92' },
  { label: '早退処理の有無（0: 無1: 有）', key: 'h93' },
  { label: '遅刻（0: 有1: 無）', key: 'h94' },
  { label: '早退（0: 有1: 無）', key: 'h95' },
  { label: '直行1', key: 'h96' },
  { label: '直帰1', key: 'h97' },
  { label: '直行2', key: 'h98' },
  { label: '直帰2', key: 'h99' },
  { label: '直行3', key: 'h100' },
  { label: '直帰3', key: 'h101' },
  { label: '直行4', key: 'h102' },
  { label: '直帰4', key: 'h103' },
  { label: '直行5', key: 'h104' },
  { label: '直帰5', key: 'h105' },
  { label: '直行6', key: 'h106' },
  { label: '直帰6', key: 'h107' },
  { label: '直行7', key: 'h108' },
  { label: '直帰7', key: 'h109' },
  { label: '直行8', key: 'h110' },
  { label: '直帰8', key: 'h111' },
  { label: '直行9', key: 'h112' },
  { label: '直帰9', key: 'h113' },
  { label: '直行10', key: 'h114' },
  { label: '直帰10', key: 'h115' },
  { label: '打刻区分ID: 1', key: 'h116' },
  { label: '打刻区分ID: 2', key: 'h117' },
  { label: '打刻区分ID: 3', key: 'h118' },
  { label: '打刻区分ID: 4', key: 'h119' },
  { label: '打刻区分ID: 5', key: 'h120' },
  { label: '打刻区分ID: 6', key: 'h121' },
  { label: '打刻区分ID: 7', key: 'h122' },
  { label: '打刻区分ID: 8', key: 'h123' },
  { label: '打刻区分ID: 9', key: 'h124' },
  { label: '打刻区分ID: 10', key: 'h125' },
  { label: '打刻区分ID: 11', key: 'h126' },
  { label: '打刻区分ID: 12', key: 'h127' },
  { label: '打刻区分ID: 13', key: 'h128' },
  { label: '打刻区分ID: 14', key: 'h129' },
  { label: '打刻区分ID: 15', key: 'h130' },
  { label: '打刻区分ID: 16', key: 'h131' },
  { label: '打刻区分ID: 17', key: 'h132' },
  { label: '打刻区分ID: 18', key: 'h133' },
  { label: '打刻区分ID: 19', key: 'h134' },
  { label: '打刻区分ID: 20', key: 'h135' },
  { label: '打刻区分ID: 21', key: 'h136' },
  { label: '打刻区分ID: 22', key: 'h137' },
  { label: '打刻区分ID: 23', key: 'h138' },
  { label: '打刻区分ID: 24', key: 'h139' },
  { label: '打刻区分ID: 25', key: 'h140' },
  { label: '打刻区分ID: 26', key: 'h141' },
  { label: '打刻区分ID: 27', key: 'h142' },
  { label: '打刻区分ID: 28', key: 'h143' },
  { label: '打刻区分ID: 29', key: 'h144' },
  { label: '打刻区分ID: 30', key: 'h145' },
  { label: '打刻区分ID: 31', key: 'h146' },
  { label: '打刻区分ID: 32', key: 'h147' },
  { label: '打刻区分ID: 33', key: 'h148' },
  { label: '打刻区分ID: 34', key: 'h149' },
  { label: '打刻区分ID: 35', key: 'h150' },
  { label: '打刻区分ID: 36', key: 'h151' },
  { label: '打刻区分ID: 37', key: 'h152' },
  { label: '打刻区分ID: 38', key: 'h153' },
  { label: '打刻区分ID: 39', key: 'h154' },
  { label: '打刻区分ID: 40', key: 'h155' },
  { label: '打刻区分ID: 41', key: 'h156' },
  { label: '打刻区分ID: 42', key: 'h157' },
  { label: '打刻区分ID: 43', key: 'h158' },
  { label: '打刻区分ID: 44', key: 'h159' },
  { label: '打刻区分ID: 45', key: 'h160' },
  { label: '打刻区分ID: 46', key: 'h161' },
  { label: '打刻区分ID: 47', key: 'h162' },
  { label: '打刻区分ID: 48', key: 'h163' },
  { label: '打刻区分ID: 49', key: 'h164' },
  { label: '打刻区分ID: 50', key: 'h165' },
  { label: '未打刻', key: 'h166' },
  { label: '欠勤', key: 'h167' },
  { label: '休日打刻', key: 'h168' },
  { label: '休暇打刻', key: 'h169' },
  { label: '実績確定状況', key: 'h170' },
  { label: '出勤乖離時間（出勤時刻ー入館時刻）', key: 'h171' },
  { label: '退勤乖離時間（退館時刻ー退勤時刻）', key: 'h172' },
  { label: '出勤乖離時間（出勤時刻ーPC起動時刻）', key: 'h173' },
  { label: '退勤乖離時間（PC停止時刻ー退勤時刻）', key: 'h174' },
]

export type ShiftCsv = {
  display: string
  workType: string
  version: string
  adId: string
  lastName: string
  firstName: string
  farmName: string
  farmId: string
  date: string
  start: string
  end: string
}

export const SHIFT_HEADERS: CsvHeader[] = [
  { label: 'Id', key: 'h1' },
  { label: '表示', key: 'display' },
  { label: '勤務タイプ', key: 'workType' },
  { label: 'シフトバージョン', key: 'version' },
  { label: 'スタッフコード', key: 'adId' },
  { label: 'スタッフ姓', key: 'lastName' },
  { label: 'スタッフ名', key: 'firstName' },
  { label: '農園名', key: 'farmName' },
  { label: 'sf_farm_id', key: 'farmId' },
  { label: '日にち', key: 'date' },
  { label: '勤務開始時間', key: 'start' },
  { label: '勤務終了時間', key: 'end' },
]
