import './index.less';
import * as url from 'url';


export default class SpButton extends React.Component<{}, {
  type?: number;
  value: string;
  url?: string;
}> {
  openWin = () => {
    const { url } = this.props;
    // 检查url
    let des;
    if (url) {
      if (url.indexOf('http://') != 0 || url.indexOf('https://') != 0)
        des = 'http://' + url;
      else des = url;
    } else des = 'blank';

    window.open(des);
  };

  render() {
    const { type, value } = this.props;
    // 检查类型
    let typeChoice = 'fancy-button ';
    if (type) typeChoice += 'bg-gradient' + type;
    else typeChoice += 'bg-gradient1';

    return (
      <a className={typeChoice} onClick={this.openWin}><span>{value}</span></a>
    );
  }
}
