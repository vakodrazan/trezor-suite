/**
 * Support custom protocols (for example: `bitcoin:`)
 */
import { isValidProtocol } from '@desktop-electron/libs/protocol';
import { app } from 'electron';

const init = ({ mainWindow }: Dependencies) => {
    const { logger } = global;

    const protocols = process.env.PROTOCOLS as unknown as string[];
    protocols.forEach((p: string) => app.setAsDefaultProtocolClient(p));

    const sendProtocolInfo = (protocol: string) => {
        if (isValidProtocol(protocol, protocols)) {
            mainWindow.webContents.send('protocol/open', protocol);
        }
    };

    // Initial protocol send (if the app is launched via custom protocol)
    if (process.argv[1]) {
        sendProtocolInfo(process.argv[1]);
    }

    app.on('second-instance', (_, argv) => {
        logger.info('custom-protocols', 'Second instance opened');

        // If a custom protocol is being clicked on while the app is running
        if (argv[1]) {
            sendProtocolInfo(argv[1]);
        }

        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }

            mainWindow.focus();
        }
    });

    // Protocol handler for macOS
    app.on('open-url', (event, url) => {
        logger.info('custom-protocols', `Handle open protocol url ${url}`);
        event.preventDefault();

        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        } else {
            mainWindow.focus();
        }

        sendProtocolInfo(url);
    });
};

export default init;
