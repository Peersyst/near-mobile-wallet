import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function FilledDAOIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "FilledDAOIcon" }}
        >
            <Path d="M23.7413 7.19809C23.6129 6.97586 23.4419 6.78114 23.2381 6.62506C23.0343 6.46898 22.8018 6.3546 22.5538 6.28846C22.3057 6.22233 22.0471 6.20573 21.7927 6.23962C21.5382 6.27351 21.293 6.35723 21.0709 6.48598H21.062L17.8932 3.07501C18.0594 2.83825 18.1709 2.56753 18.2197 2.28241C18.2685 1.99728 18.2534 1.70488 18.1754 1.42633C18.0974 1.14777 17.9584 0.890027 17.7687 0.671711C17.5789 0.453395 17.343 0.279963 17.078 0.163949C16.813 0.0479336 16.5256 -0.00776728 16.2364 0.000871079C15.9473 0.00950944 15.6637 0.0822712 15.4061 0.213899C15.1485 0.345526 14.9234 0.532731 14.747 0.761987C14.5706 0.991243 14.4473 1.25682 14.3861 1.53954L9.31233 1.92051C9.26935 1.77663 9.2096 1.63831 9.13431 1.50838C8.85784 1.09468 8.43425 0.801737 7.9496 0.689057C7.46495 0.576377 6.95558 0.652412 6.52496 0.901716C6.09434 1.15102 5.77478 1.5549 5.63118 2.0313C5.48757 2.50771 5.53071 3.02091 5.75182 3.46667C5.81475 3.57407 5.88714 3.67565 5.96812 3.7702L2.76721 8.45495C2.47555 8.32141 2.1555 8.26173 1.83532 8.28119C1.51513 8.30065 1.20466 8.39864 0.93132 8.56652C0.657978 8.73439 0.430174 8.96698 0.26802 9.24376C0.105866 9.52053 0.0143508 9.83297 0.00155526 10.1535C-0.0112403 10.474 0.055077 10.7928 0.194652 11.0816C0.334227 11.3704 0.542765 11.6204 0.801855 11.8095C1.06094 11.9987 1.36262 12.1211 1.68023 12.166C1.99785 12.2109 2.32164 12.177 2.62301 12.0671L3.96978 16.4358C3.80197 16.479 3.64085 16.5449 3.49089 16.6317C3.24824 16.7487 3.03236 16.9146 2.85673 17.1188C2.6811 17.3231 2.54951 17.5614 2.47019 17.8189C2.39087 18.0763 2.36551 18.3474 2.39572 18.6151C2.42593 18.8828 2.51104 19.1414 2.64575 19.3747C2.78045 19.608 2.96184 19.811 3.17857 19.971C3.3953 20.131 3.64272 20.2445 3.90534 20.3046C4.16796 20.3646 4.44015 20.3698 4.70487 20.3198C4.96959 20.2698 5.22116 20.1658 5.44383 20.0142C5.77945 19.8218 6.04955 19.5331 6.21913 19.1855L11.4077 21.2238C11.2974 21.5317 11.266 21.8623 11.3163 22.1855C11.3665 22.5086 11.497 22.814 11.6956 23.0738C11.8943 23.3336 12.1548 23.5395 12.4535 23.6727C12.7522 23.806 13.0794 23.8623 13.4055 23.8365C13.7315 23.8108 14.0459 23.7038 14.3199 23.5253C14.594 23.3468 14.8189 23.1026 14.9743 22.8148C15.1297 22.527 15.2106 22.2049 15.2095 21.8779C15.2084 21.5509 15.1255 21.2293 14.9682 20.9426L19.3298 18.4253C19.663 18.758 20.105 18.9595 20.5746 18.9929C21.0443 19.0263 21.5103 18.8894 21.8872 18.6072C22.2641 18.3249 22.5268 17.9164 22.627 17.4563C22.7272 16.9962 22.6583 16.5154 22.4328 16.102C22.2311 15.749 21.923 15.4686 21.5525 15.3009L22.3349 10.107C22.6495 10.0594 22.9478 9.93579 23.2039 9.74694C23.46 9.5581 23.6663 9.30969 23.8048 9.02321C23.9433 8.73673 24.0099 8.42081 23.9988 8.1028C23.9878 7.78479 23.8994 7.47426 23.7413 7.19809ZM15.9465 3.87435C16.3733 3.9526 16.814 3.88619 17.1989 3.68564L20.3971 7.13222C20.1838 7.47143 20.0791 7.8677 20.0971 8.26802L17.2799 9.09673C17.2118 8.94448 17.1357 8.79592 17.052 8.65167C16.5306 7.74902 15.7551 7.0197 14.8222 6.55452L15.9465 3.87435ZM9.35951 2.84714L14.4074 2.46794C14.4525 2.63029 14.5177 2.78638 14.6015 2.93259C14.7283 3.15386 14.8981 3.34755 15.1008 3.50227L13.9615 6.21894C12.7409 5.85208 11.429 5.93675 10.2657 6.4575L8.75244 3.94021C9.06991 3.65286 9.28336 3.26852 9.35951 2.84714ZM6.72028 4.29983C7.10767 4.4556 7.53487 4.48275 7.93886 4.37727L9.45742 6.90523C8.33702 7.66016 7.5476 8.81484 7.25079 10.1328L3.82291 9.65929C3.7795 9.51783 3.71975 9.38191 3.64488 9.25428C3.59978 9.1752 3.54921 9.09935 3.49356 9.0273L6.72028 4.29983ZM5.55332 16.702C5.36466 16.5764 5.15564 16.4846 4.93557 16.4305L3.42235 11.5232C3.6529 11.2614 3.80932 10.9427 3.87542 10.6002L7.12529 11.0452C7.07145 12.0694 7.31637 13.0871 7.83027 13.9746C7.91127 14.1135 7.99672 14.2417 8.08751 14.3743L5.55332 16.702ZM12.2729 20.1868C12.1492 20.258 12.0337 20.3425 11.9284 20.4388L6.42119 18.2757C6.41307 17.9641 6.33067 17.659 6.18086 17.3856L8.6839 15.0882C9.67375 16.0722 11.0098 16.6292 12.4055 16.6397L12.6512 20.0222C12.5198 20.0647 12.3933 20.1211 12.2738 20.1904L12.2729 20.1868ZM18.8607 17.6322L14.3211 20.2509C14.0924 20.1011 13.8356 19.9996 13.5663 19.9527L13.3188 16.5703C14.6174 16.3515 15.7887 15.6588 16.606 14.6262L18.9293 16.3317C18.7567 16.7441 18.7313 17.2033 18.8572 17.6322H18.8607ZM20.6374 15.1318C20.3274 15.1461 20.0255 15.235 19.7571 15.3908C19.6585 15.4487 19.565 15.5148 19.4776 15.5884L17.1232 13.8491C17.7634 12.661 17.9313 11.2748 17.5932 9.96817L20.3588 9.15459C20.5928 9.56142 20.9668 9.86925 21.411 10.0207L20.6374 15.1318Z" />
        </SvgIcon>
    );
}
